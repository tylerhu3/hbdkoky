// VerseCard.tsx
import React from 'react';
import { loadBibleData } from './BibleDB';

interface VerseCardProps {
  verseText: string;
  bookName: string;
  chapter: string;
  verse: string;
}

const VerseCard: React.FC<VerseCardProps> = ({ verseText, bookName, chapter, verse }) => {
    
    const generateQuote = async (hour: number, minute: number) => {

        var bookNumber = 0
        
        const bibleData = await loadBibleData();
        // Will need to generate a nnumber between 0 and bibleData.length

        var book = bibleData[bookNumber].book
        var chapters = bibleData[bookNumber].chapters
        var verse = chapters[hour].verses[minute]
            
        console.log(`Bible Data from Book ${book} Hour: ${hour} Minute ${minute} ${verse.text}`);
    }

    React.useEffect(() => {
    // Code here will run after the component is mounted
    const fetchData = async () => {
        var bookNumber = 0
        var hour = Math.floor(Math.random() * 12) + 1;
        var min = Math.floor(Math.random() * 60)
        const bibleData = await loadBibleData();
        console.log(`Bible Data: ${bibleData}`);
        console.log(`Bible Data2: bibleData[0].chapters ${bibleData[0].chapters}`);
        console.log(`Bible Data2: bibleData[0].chapters.length ${bibleData[0].chapters.length}`);
        console.log(`Bible Data3: bibleData[0].chapters[0].verses[0].text ${bibleData[0].chapters[0].verses[0].text}`);
        console.log(`Bible Data3: bibleData[0].chapters[0].verses[0].length ${bibleData[0].chapters[0].verses.length}`);

        bookNumber = Math.floor(Math.random() * bibleData.length)
        while(true){
          bookNumber = Math.floor(Math.random() * bibleData.length);
          console.log(`Random Generated Book Number: ${(bookNumber)} hour: ${hour} min: ${min}`);
          const numOfChapters = bibleData[bookNumber].chapters.length
          // console.log(`Random Generated Book Data: ${JSON.stringify(bibleData[bookNumber])}`);
          if (hour >= numOfChapters) {
            continue;
          }
          console.log(`TYLER:: bibleData[bookNumber].chapters[hour]: ${bibleData[bookNumber].chapters[hour]}`)

          const numOfVerseForThisChapter = bibleData[bookNumber].chapters[hour].verses.length
          console.log(`TYLER:: numOfVerseForThisChapter: ${numOfVerseForThisChapter}`)
          if (numOfVerseForThisChapter >= min) {
            continue;
          }
          break;
        }
        var book = bibleData[bookNumber].book
        var chapters = bibleData[hour].chapters
        var verse = chapters[hour].verses[min]
        
        
        console.log(`Bible Data from Book ${book} Hour: ${hour} Minute ${min} ${verse.text}`);
    };
    
    fetchData();
    }, []); // Empty array means the effect runs once after the initial render
  
    return (
    <div
      style={{
        width: '300px',
        padding: '20px',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <h2
        style={{
          fontSize: '18px',
          color: '#333',
          marginBottom: '10px',
        }}
      >
        {bookName} {chapter}:{verse}
      </h2>
      <p
        style={{
          fontSize: '16px',
          color: '#555',
          lineHeight: '1.6',
          marginBottom: '10px',
        }}
      >
        "{verseText}"
      </p>
      <div
        style={{
          fontSize: '14px',
          color: '#888',
          fontStyle: 'italic',
        }}
      >
        - Bible Verse
      </div>

    </div>
  );
};

export default VerseCard;
