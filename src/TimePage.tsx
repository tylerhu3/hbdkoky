import React, { useState, useEffect } from "react";

type Quote = {
  verse: string;
  reference: string;
};

const quotes: Record<string, Quote> = {
  "11:13": {
    verse: "A gossip betrays a confidence, but a trustworthy person keeps a secret.",
    reference: "Proverbs 11:13",
  },
  // Add more time-quote mappings here
};

const TimePage: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime(); // Initialize time immediately
    return () => clearInterval(timer);
  }, []);

  const currentQuote = quotes[time.replace(" ", "")] || {
    verse: "Time for everything under the sun.",
    reference: "Ecclesiastes 3:1",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{time}</h1>
      <blockquote style={{ fontSize: "1.5rem", marginTop: "20px" }}>
        {currentQuote.verse}
      </blockquote>
      <p style={{ textAlign: "right", fontStyle: "italic", marginRight:"20px", marginTop: "10px" }}>
        - {currentQuote.reference}
      </p>
    </div>
  );
};

export default TimePage;
