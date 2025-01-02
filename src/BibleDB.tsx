// BibleRepository.ts
export type Verse = {
  verse: string;
  text: string;
};

export type Chapter = {
  chapter: string;
  verses: Verse[];
};

export type Book = {
  book: string;
  chapters: Chapter[];
};

const fileList = [
  '1Corinthians.json', '1John.json', '1Peter.json', '1Thessalonians.json',
  '1Timothy.json', '2Corinthians.json', '2John.json', '2Peter.json',
  '2Thessalonians.json', '2Timothy.json', '3John.json', 'Acts.json',
  'Books.json', 'Colossians.json', 'Ephesians.json', 'Galatians.json',
  'Hebrews.json', 'James.json', 'John.json', 'Jude.json', 'Luke.json',
  'Mark.json', 'Matthew.json', 'Philemon.json', 'Philippians.json',
  'Revelation.json', 'Romans.json', 'Titus.json',
];

export const loadBibleData = async (): Promise<Book[]> => {
  try {
    const bibleDataPromises = fileList.map(async (file) => {
      const response = await fetch(`/Bible-kjv-master/${file}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.statusText}`);
      }
      const fileContent = await response.json();
      return fileContent as Book;
    });

    return Promise.all(bibleDataPromises);
  } catch (error) {
    console.error('Error loading Bible data:', error);
    return [];
  }
};