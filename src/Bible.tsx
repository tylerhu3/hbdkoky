import React from 'react';

type Verse = {
  verse: string;
  text: string;
};

type Chapter = {
  chapter: string;
  verses: Verse[];
};

type Book = {
  book: string;
  chapters: Chapter[];
};

// Simulated list of JSON files (replace with real file names)
const fileList = [
    '1Corinthians.json',
    '1John.json',
    '1Peter.json',
    '1Thessalonians.json',
    '1Timothy.json',
    '2Corinthians.json',
    '2John.json',
    '2Peter.json',
    '2Thessalonians.json',
    '2Timothy.json',
    '3John.json',
    'Acts.json',
    'Books.json',
    'Colossians.json',
    'Ephesians.json',
    'Galatians.json',
    'Hebrews.json',
    'James.json',
    'John.json',
    'Jude.json',
    'Luke.json',
    'Mark.json',
    'Matthew.json',
    'Philemon.json',
    'Philippians.json',
    'Revelation.json',
    'Romans.json',
    'Titus.json',
  ];
  

const loadBibleData = async (): Promise<Book[]> => {
  try {
    console.log("Tyler 1")
    const bibleDataPromises = fileList.map(async (file) => {
      const response = await fetch(`/Bible-kjv-master/${file}`); // Files should be in the public folder
      console.log("Tyler 2 file", file)
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.statusText}`);
      }
      const fileContent = await response.json();
      console.log("Tyler 3 file", fileContent)
      return fileContent as Book;
    });

    return Promise.all(bibleDataPromises);
  } catch (error) {
    console.error('Error loading Bible data:', error);
    return [];
  }
};

const findVerse = (bibleData: Book[], bookName: string, chapter: string, verse: string): string | null => {
  const book = bibleData.find((b) => b.book === bookName);
  if (!book) return null;
  const chapterData = book.chapters.find((c) => c.chapter === chapter);
  if (!chapterData) return null;
  const verseData = chapterData.verses.find((v) => v.verse === verse);
  return verseData ? verseData.text : null;
};

const BibleVerseComponent: React.FC<{ bookName: string; chapter: string; verse: string }> = ({
  bookName,
  chapter,
  verse,
}) => {
  const [verseText, setVerseText] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchBibleData = async () => {
      const bibleData = await loadBibleData();
      const text = findVerse(bibleData, bookName, chapter, verse);
      setVerseText(text);
    };

    fetchBibleData();
  }, [bookName, chapter, verse]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>
        {bookName} {chapter}:{verse}
      </h1>
      <p>{verseText || 'Verse not found'}</p>
    </div>
  );
};

export default BibleVerseComponent;
