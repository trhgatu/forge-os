import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class FlashcardsService {
  constructor(private readonly prisma: PrismaService) { }

  async getDecks(userId: string) {
    return this.prisma.flashcardDeck.findMany({
      where: { userId },
      include: {
        _count: {
          select: { cards: true },
        },
      },
    });
  }

  async createDeck(userId: string, data: { title: string; description?: string; colorTheme?: string }) {
    return this.prisma.flashcardDeck.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        colorTheme: data.colorTheme || 'from-indigo-500 to-cyan-500',
      },
    });
  }

  async deleteDeck(userId: string, id: string) {
    const deck = await this.prisma.flashcardDeck.findFirst({
      where: { id, userId },
    });

    if (!deck) {
      throw new NotFoundException('Không tìm thấy bộ thẻ.');
    }

    await this.prisma.flashcardDeck.delete({ where: { id } });
    return { success: true };
  }

  // --------------------------------------------------
  // FLASHCARD ENRICHMENT & CREATION
  // --------------------------------------------------
  async forgeCard(userId: string, data: {
    deckId: string;
    word: string;             // Từ vựng muốn rèn
    conceptId?: string;       // ID bài nghiên cứu nguồn
    highlightText?: string;   // Ngữ cảnh bôi đen thực tế
    personalNote?: string;
  }) {
    // 1. Check if Vocabulary exists in Central Dictionary
    const cleanWord = data.word.trim().toLowerCase();
    let vocab = await this.prisma.vocabulary.findUnique({
      where: { word: cleanWord },
    });

    if (!vocab) {
      // 2. Fetch from APIs & Enrich dynamically
      vocab = await this.enrichAndSaveVocabulary(cleanWord);
    }

    // Verify concept exists in DB to avoid Foreign Key constraint violations
    let dbConceptId: string | undefined = undefined;
    if (data.conceptId) {
      const dbConcept = await this.prisma.knowledgeConcept.findUnique({
        where: { id: data.conceptId },
      });
      if (dbConcept) {
        dbConceptId = dbConcept.id;
      }
    }

    // 3. Create the customized UserFlashcard
    return this.prisma.userFlashcard.create({
      data: {
        userId,
        deckId: data.deckId,
        vocabularyId: vocab.id,
        conceptId: dbConceptId,
        highlightText: data.highlightText,
        personalNote: data.personalNote,
        customFront: data.word,
        // Default translation as custom back
        customBack: (vocab.meanings as any)?.[0]?.definitions?.[0] || 'Từ vựng rèn từ bài đọc',
        nextReviewDate: new Date(), // Review immediately!
      },
      include: {
        vocabulary: true,
      },
    });
  }

  // --------------------------------------------------
  // SM-2 SPACED REPETITION ENGINE
  // --------------------------------------------------
  async reviewCard(userId: string, cardId: string, rating: number, responseTimeMs: number) {
    const card = await this.prisma.userFlashcard.findFirst({
      where: { id: cardId, userId },
    });

    if (!card) {
      throw new NotFoundException('Không tìm thấy thẻ học của bạn.');
    }

    // Capture SM-2 variables before review
    const prevInterval = card.interval;
    const prevEasiness = card.easiness;
    const prevRepetitions = card.repetitions;

    // Run academic SM-2 calculations
    let interval = 1;
    let easiness = prevEasiness;
    let repetitions = prevRepetitions;
    let state = 'review';

    if (rating < 3) {
      // Wrong response (Again/Hard): Reset repetition count, set next review to tomorrow
      repetitions = 0;
      interval = 1;
      state = 'relearn';
      easiness = Math.max(1.3, prevEasiness - 0.2);
    } else {
      // Correct response (Good/Easy)
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 4;
      } else {
        interval = Math.round(prevInterval * prevEasiness);
      }

      repetitions = repetitions + 1;
      state = 'review';

      // Adjust Easiness Factor
      const normalizedQuality = rating + 1; // Translate our rating 1-4 scale to 2-5 scale
      easiness = prevEasiness + (0.1 - (5 - normalizedQuality) * (0.08 + (5 - normalizedQuality) * 0.02));
      easiness = Math.max(1.3, easiness);
    }

    // Calculate next review date
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    // Write atomic transaction: Update card AND write log!
    const [updatedCard] = await this.prisma.$transaction([
      this.prisma.userFlashcard.update({
        where: { id: cardId },
        data: {
          interval,
          easiness,
          repetitions,
          state,
          nextReviewDate,
        },
        include: {
          vocabulary: true,
        },
      }),
      this.prisma.flashcardReviewLog.create({
        data: {
          cardId,
          userId,
          rating,
          previousInterval: prevInterval,
          newInterval: interval,
          previousEasiness: prevEasiness,
          newEasiness: easiness,
          responseTimeMs,
        },
      }),
    ]);

    return updatedCard;
  }

  // --------------------------------------------------
  // GET DUE REVIEWS FOR THE DAY
  // --------------------------------------------------
  async getDueCards(userId: string, deckId?: string) {
    const now = new Date();
    return this.prisma.userFlashcard.findMany({
      where: {
        userId,
        ...(deckId ? { deckId } : {}),
        nextReviewDate: {
          lte: now,
        },
      },
      include: {
        vocabulary: true,
        concept: {
          select: { title: true, id: true },
        },
      },
      orderBy: { nextReviewDate: 'asc' },
    });
  }

  // --------------------------------------------------
  // DICTIONARY AND TRANSLATION HARVESTING
  // --------------------------------------------------
  private async enrichAndSaveVocabulary(word: string) {
    let ipa = '';
    let audioUrl = '';
    let partOfSpeech = 'noun';
    let meaningsData: any[] = [];
    let examples: any[] = [];

    // 1. Call Dictionary API
    try {
      const dictRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { timeout: 4000 });
      const entry = dictRes.data[0];

      // Extract IPA
      const phoneticObjWithText = entry.phonetics?.find((p: any) => p.text && p.text.trim() !== '');
      ipa = phoneticObjWithText ? phoneticObjWithText.text : (entry.phonetic || '');

      // Extract Audio MP3 URL (Prefer US, then UK, then any)
      const phoneticsList = entry.phonetics || [];
      const usAudio = phoneticsList.find((p: any) => p.audio && p.audio.includes('-us.mp3'));
      const ukAudio = phoneticsList.find((p: any) => p.audio && p.audio.includes('-uk.mp3'));
      const anyAudio = phoneticsList.find((p: any) => p.audio && p.audio.trim() !== '');

      if (usAudio) audioUrl = usAudio.audio;
      else if (ukAudio) audioUrl = ukAudio.audio;
      else if (anyAudio) audioUrl = anyAudio.audio;
      else audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(word)}`;

      const primaryMeaning = entry.meanings?.[0] || {};
      partOfSpeech = primaryMeaning.partOfSpeech || 'noun';

      examples = primaryMeaning.definitions
        ?.filter((d: any) => d.example)
        ?.map((d: any) => ({ en: d.example, vi: '' })) || [];

      meaningsData = entry.meanings?.map((m: any) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions?.map((d: any) => d.definition) || [],
        synonyms: m.synonyms || [],
        antonyms: m.antonyms || []
      })) || [];
    } catch (e) {
      // Fallback values if word is not in Dictionary API
      ipa = '';
      audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(word)}`;
    }

    // 2. Translate to Vietnamese via Google Translate Public API
    let vietnameseTranslation = 'Chưa rõ nghĩa';
    try {
      const transRes = await axios.get(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(word)}`,
        { timeout: 3000 }
      );
      vietnameseTranslation = transRes.data[0][0][0] || 'Chưa rõ nghĩa';
    } catch (e) {
      vietnameseTranslation = word;
    }

    if (meaningsData.length === 0) {
      meaningsData.push({
        partOfSpeech,
        definitions: [vietnameseTranslation],
        synonyms: [],
        antonyms: []
      });
    } else {
      meaningsData.unshift({
        partOfSpeech: 'Vietnamese',
        definitions: [vietnameseTranslation],
        synonyms: [],
        antonyms: []
      });
    }
    return this.prisma.vocabulary.create({
      data: {
        word,
        ipa,
        audioUrl,
        partOfSpeech,
        meanings: meaningsData as any,
        examples: examples as any,
      },
    });
  }
}
