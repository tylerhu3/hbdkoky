import React, { useState, useEffect, useRef } from 'react'
import { Book, Chapter, loadBibleData, Verse } from './BibleDB';
interface VerseCardProps { }

const VerseCard: React.FC<VerseCardProps> = () => {
  const [verseText, setVerseText] = React.useState<string>('In the beginning God created the heavens and the earth.');
  const [bookName, setBookName] = React.useState<string>('Genesis');
  const [chapter, setChapter] = React.useState<string>('1');
  const [verse, setVerse] = React.useState<string>('1');
  const [previousTime, setPreviousTime] = React.useState<string>('x');
  const [bibleData, setBibleData] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    orientation: 'portrait',
  });

  const pepTalksForKoky: string[] = [
    "",
    "Koky, you are stronger than any challenge that comes your way. Keep shining and pushing forward—you’ve got this!",
    "Every step you take, no matter how small, brings you closer to your goals, Koky. Believe in your power to achieve greatness.",
    "Koky, your kindness and resilience inspire everyone around you. Never underestimate your ability to make a difference.",
    "You’re capable of more than you know, Koky. Don’t let doubt hold you back—show the world your magic!",
    "Koky, remember that every setback is just a setup for a greater comeback. Keep your head up and keep moving forward!",
    "Your journey is uniquely yours, Koky. Celebrate every win, and don’t be afraid to write your own amazing story.",
    "Koky, you have a light inside you that can brighten even the darkest days. Keep spreading your positivity and strength!",
    "Believe in yourself, Koky—because we all believe in you. You are unstoppable when you follow your heart.",
    "Challenges are just opportunities in disguise, Koky. Embrace them, learn, and let them shape you into an even stronger person.",
    "Koky, don’t forget to take a moment to appreciate how far you’ve come. You are incredible, and your efforts matter!",
    "There’s no dream too big for someone as determined as you, Koky. Keep chasing them with all your heart!",
    "Koky, you are loved, you are valued, and you are amazing just the way you are. Keep being your authentic self—it’s more than enough!"
  ];

  const pepTalks: string[] = [
    "Remember, every expert was once a beginner. Your dedication to learning and growing sets you apart. Take pride in your progress, no matter how small it may seem.",
    
    "You've overcome challenges before, and you'll overcome this one too. Your resilience is your superpower. Trust in your ability to figure things out.",
    
    "Don't compare your chapter 1 to someone else's chapter 20. Focus on your own journey and celebrate your unique path. You're exactly where you need to be.",
    
    "Setbacks aren't failures; they're opportunities to learn and come back stronger. Every obstacle you face is making you more resourceful and determined.",
    
    "Your potential is limitless. When you feel stuck, remember that breakthrough moments often come right after the biggest challenges. Keep pushing forward.",
    
    "Success isn't about being perfect; it's about being persistent. Each step forward, no matter how small, brings you closer to your goals. You've got this!",
    
    "Think of how far you've come instead of how far you have to go. You've already proven you have what it takes. Now it's just about keeping that momentum.",
    
    "Your worth isn't measured by your productivity or achievements. You are valuable simply because you are you. Let that truth empower you today.",
    
    "Every expert started exactly where you are now. Your curiosity and willingness to learn are your greatest assets. Trust the process and keep going.",
    
    "Don't wait until you feel ready - you'll grow into your capabilities as you challenge yourself. Take that first step, even if it feels uncertain.",
    
    "Your past experiences have equipped you with unique insights and strengths. Use them as fuel for your journey forward. You're more prepared than you realize.",
    
    "Remember why you started. That spark of passion and purpose is still within you. Let it guide you through the challenging moments.",
    
    "You don't have to see the whole staircase to take the first step. Trust in your ability to figure things out as you go. Your future self will thank you for starting today."
];


  useEffect(() => {
    const updateDeviceInfo = () => {
      const isMobile = /Mobi|Android|iP(hone|ad|od)/i.test(navigator.userAgent);
      const orientation = window.matchMedia('(orientation: portrait)').matches
        ? 'portrait'
        : 'landscape';
      setDeviceInfo({ isMobile, orientation });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);

  // Load Bible data once when component mounts
  React.useEffect(() => {
    const initializeBibleData = async () => {
      try {
        const data = await loadBibleData();
        setBibleData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Bible data:', error);
        setIsLoading(false);
      }
    };

    initializeBibleData();
  }, []);

  async function noVerseFoundAction(hour: string, min: string) {
    setBookName("Pep Talks(Not Bible)");
    setChapter(hour);
    setVerse(min);
    setVerseText(pepTalks[Number(hour)]);
  }

  // Update verse based on time
  React.useEffect(() => {
    if (isLoading || bibleData.length === 0) return;
    console.log("Loading Verse 1")
    const updateVerse = () => {
      try {
        const now = new Date();
        var currentHour = (now.getHours() == 24 || now.getHours() == 0 || now.getHours() == 12) ? 12 : now.getHours() % 12;
        var currentMinute = now.getMinutes();

        // currentHour = 12
        // currentMinute = 59

        const timeString = `Hour: ${currentHour} Minute:${currentMinute}`;
        console.log("Loading Verse 2 ", timeString)
        if (previousTime === timeString) {
          return;
        }
        console.log("Loading Verse 3")
        setPreviousTime(timeString);

        // Find a valid verse for the current time
        let validVerse = null;
        let attempts = 0;
        const maxAttempts = 300;
        console.log("Loading Verse 4")
        if (currentMinute == 0) {
          noVerseFoundAction(currentHour.toString(), currentMinute.toString())
          return
        }

        while (!validVerse && attempts < maxAttempts) {
          console.log("Loading Verse 4.1")
          const randomBookIndex = Math.floor(Math.random() * bibleData.length);
          const selectedBook = bibleData[randomBookIndex];

          if (selectedBook?.chapters && currentHour < selectedBook.chapters.length) {
            const selectedChapter = selectedBook.chapters[currentHour];

            if (selectedChapter?.verses && currentMinute < selectedChapter.verses.length) {
              const selectedVerse = selectedChapter.verses[currentMinute];

              if (selectedVerse?.text) {
                validVerse = {
                  book: selectedBook.book,
                  chapter: (currentHour).toString(),
                  verse: (currentMinute).toString(),
                  text: selectedVerse.text
                };
                break;
              }
            }
          }
          attempts++;
        }
        console.log("Loading Verse 5 ", (validVerse != null) ? validVerse.text : "null verse  ")
        if (validVerse) {
          setBookName(validVerse.book);
          setChapter(validVerse.chapter);
          setVerse(validVerse.verse);
          setVerseText(validVerse.text);
        } else {
          noVerseFoundAction(currentHour.toString(), currentMinute.toString())
        }
      } catch (error) {
        console.error('Error updating verse:', error);
      }
    };

    updateVerse();
    const interval = setInterval(updateVerse, 1000);

    return () => clearInterval(interval);
  }, [bibleData, previousTime, isLoading]);

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        Loading Bible verses...
      </div>
    );
  }

  return (
    <div
      style={{
        // color:"black",
        // width: "100vh",
        // // backgroundColor: 'pink',
        // minHeight: '100vh',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // padding: '10px', // Add padding for smaller screens

        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        minHeight: "100vh", // Full viewport height
        margin: 0,
        // backgroundColor: "pink",
      }}
    >
      {/* Header */}
      {/* Top-Left Heading */}
      <h1
        style={{
          position: "absolute", // Allows positioning at the top center
          top: "10px", // 10px from the top
          left: "50%", // Start from the horizontal center of the container
          transform: "translateX(-50%)", // Adjust back by 50% of its own width
          paddingTop: "5%",
          fontSize: "2.5  rem",
          fontWeight: "bold",
          color: "black",
          fontFamily: '"Playwrite VN", serif',
          fontOpticalSizing: 'auto',
          fontStyle: 'normal',
          textShadow: '2px 2px 10px white', // Adjust values for size and blur
          overflow: 'none',   // Optional: Hide overflow if the text is too long
        }}
      >
        Bible Clock
      </h1>



      {/* Card */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)',
          maxWidth: '500px',
          width: '100%', // Use full width on smaller screens
          textAlign: 'center',
        }}
      >
        <div style={{ color: 'black' }}>
          <blockquote
            style={{
              fontSize: '1.2rem', // Slightly smaller font for better scaling
              marginTop: '20px',
            }}
          >
            {verseText}
          </blockquote>
          <p
            style={{
              fontSize: '1rem', // Adjust font size for smaller screens
              textAlign: 'right',
              fontStyle: 'italic',
              marginRight: '10px',
              marginTop: '5px',
            }}
          >
            - <strong>  {bookName} {chapter}:{verse}</strong>
          </p>
        </div>
      </div>
    </div>


  );
};

export default VerseCard;