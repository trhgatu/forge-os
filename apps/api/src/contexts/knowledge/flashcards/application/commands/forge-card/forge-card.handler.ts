import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ForgeCardCommand } from './forge-card.command';
import { FlashcardRepository } from '../../../domain/flashcard.repository';
import { Card } from '../../../domain/card.entity';
import { CardId } from '../../../domain/value-objects/card-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(ForgeCardCommand)
export class ForgeCardHandler implements ICommandHandler<ForgeCardCommand, any> {
  constructor(
    @Inject('FlashcardRepository')
    private readonly repo: FlashcardRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: ForgeCardCommand): Promise<any> {
    const { payload } = command;
    const cleanWord = payload.word.trim().toLowerCase();

    // 1. Find or create vocabulary
    let vocab = await this.prisma.vocabulary.findUnique({
      where: { word: cleanWord },
    });

    if (!vocab) {
      vocab = await this.enrichAndSaveVocabulary(cleanWord);
    }

    // 2. Validate conceptId
    let dbConceptId: string | undefined = undefined;
    if (payload.conceptId) {
      const dbConcept = await this.prisma.knowledgeConcept.findUnique({
        where: { id: payload.conceptId },
      });
      if (dbConcept) {
        dbConceptId = dbConcept.id;
      }
    }

    // 3. Create Card Entity
    const cardId = CardId.random();
    const card = Card.create(
      {
        userId: payload.userId,
        deckId: payload.deckId,
        vocabularyId: vocab.id,
        conceptId: dbConceptId,
        highlightText: payload.highlightText,
        personalNote: payload.personalNote,
        customFront: payload.word,
        customBack: (vocab.meanings as any)?.[0]?.definitions?.[0] || 'Từ vựng rèn từ bài đọc',
      },
      cardId,
    );

    // 4. Save Card
    await this.repo.saveCard(card);

    // Return the response structure including vocabulary as expected by frontend
    return {
      ...card.toPersistence(),
      vocabulary: vocab,
    };
  }

  private async enrichAndSaveVocabulary(word: string) {
    let ipa = '';
    let audioUrl = '';
    let partOfSpeech = 'noun';
    let meaningsData: any[] = [];
    let examples: any[] = [];

    // Call Dictionary API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!dictRes.ok) throw new Error('Dictionary request failed');

      const dictData = await dictRes.json();
      const entry = dictData[0];

      // Extract IPA
      const phoneticObjWithText = entry.phonetics?.find((p: any) => p.text && p.text.trim() !== '');
      ipa = phoneticObjWithText ? phoneticObjWithText.text : entry.phonetic || '';

      // Extract Audio MP3 URL (Prefer US, UK, then any)
      const phoneticsList = entry.phonetics || [];
      const usAudio = phoneticsList.find((p: any) => p.audio && p.audio.includes('-us.mp3'));
      const ukAudio = phoneticsList.find((p: any) => p.audio && p.audio.includes('-uk.mp3'));
      const anyAudio = phoneticsList.find((p: any) => p.audio && p.audio.trim() !== '');

      if (usAudio) audioUrl = usAudio.audio;
      else if (ukAudio) audioUrl = ukAudio.audio;
      else if (anyAudio) audioUrl = anyAudio.audio;
      else
        audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(word)}`;

      const primaryMeaning = entry.meanings?.[0] || {};
      partOfSpeech = primaryMeaning.partOfSpeech || 'noun';

      examples =
        primaryMeaning.definitions
          ?.filter((d: any) => d.example)
          ?.map((d: any) => ({ en: d.example, vi: '' })) || [];

      meaningsData =
        entry.meanings?.map((m: any) => ({
          partOfSpeech: m.partOfSpeech,
          definitions: m.definitions?.map((d: any) => d.definition) || [],
          synonyms: m.synonyms || [],
          antonyms: m.antonyms || [],
        })) || [];
    } catch {
      ipa = '';
      audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(word)}`;
    }

    // Translate to Vietnamese
    let vietnameseTranslation = 'Chưa rõ nghĩa';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const transRes = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(word)}`,
        { signal: controller.signal },
      );
      clearTimeout(timeoutId);
      if (!transRes.ok) throw new Error('Translation request failed');

      const transData = await transRes.json();
      vietnameseTranslation = transData[0][0][0] || 'Chưa rõ nghĩa';
    } catch {
      vietnameseTranslation = word;
    }

    if (meaningsData.length === 0) {
      meaningsData.push({
        partOfSpeech,
        definitions: [vietnameseTranslation],
        synonyms: [],
        antonyms: [],
      });
    } else {
      meaningsData.unshift({
        partOfSpeech: 'Vietnamese',
        definitions: [vietnameseTranslation],
        synonyms: [],
        antonyms: [],
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
