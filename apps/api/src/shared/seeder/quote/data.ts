export interface SeedQuote {
  content: { [lang: string]: string };
  author: string;
  source: string;
  tags: string[];
  mood: string;
  status: string;
}

export const quotes: SeedQuote[] = [
  {
    content: {
      en: 'The happiness of your life depends upon the quality of your thoughts.',
      vi: 'Hạnh phúc của cuộc đời bạn phụ thuộc vào chất lượng suy nghĩ của bạn.',
    },
    author: 'Marcus Aurelius',
    source: 'Meditations',
    tags: ['stoicism', 'wisdom', 'mindset'],
    mood: 'calm',
    status: 'public',
  },
  {
    content: {
      en: 'We suffer more often in imagination than in reality.',
      vi: 'Chúng ta đau khổ trong tưởng tượng nhiều hơn là trong thực tế.',
    },
    author: 'Seneca',
    source: 'Letters from a Stoic',
    tags: ['stoicism', 'anxiety', 'realism'],
    mood: 'focused',
    status: 'public',
  },
  {
    content: {
      en: 'He who has a why to live for can bear almost any how.',
      vi: 'Người có một lý do để sống có thể chịu đựng được hầu hết mọi nghịch cảnh.',
    },
    author: 'Friedrich Nietzsche',
    source: 'Twilight of the Idols',
    tags: ['philosophy', 'purpose', 'resilience'],
    mood: 'inspired',
    status: 'public',
  },
  {
    content: {
      en: 'The only constant in life is change.',
      vi: 'Điều duy nhất không thay đổi trong cuộc sống chính là sự thay đổi.',
    },
    author: 'Heraclitus',
    source: 'Fragments',
    tags: ['philosophy', 'acceptance', 'change'],
    mood: 'neutral',
    status: 'public',
  },
  {
    content: {
      en: 'Act only according to that maxim whereby you can at the same time will that it should become a universal law.',
      vi: 'Hãy chỉ hành động theo phương châm mà qua đó bạn có thể đồng thời muốn nó trở thành một luật phổ quát.',
    },
    author: 'Immanuel Kant',
    source: 'Groundwork of the Metaphysics of Morals',
    tags: ['philosophy', 'ethics', 'duty'],
    mood: 'focused',
    status: 'public',
  },
  {
    content: {
      en: "No man steps in the same river twice, for it's not the same river and he's not the same man.",
      vi: 'Không ai tắm hai lần trên một dòng sông, vì đó không phải là cùng một dòng sông và họ không phải là cùng một người.',
    },
    author: 'Heraclitus',
    source: 'Fragments',
    tags: ['wisdom', 'change', 'growth'],
    mood: 'inspired',
    status: 'public',
  },
];
