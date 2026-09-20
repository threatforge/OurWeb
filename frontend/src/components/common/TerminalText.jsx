import React, { useState, useEffect } from 'react';

export default function TerminalText({ lines, delay = 0, speed = 40 }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    // Initial delay
    const waitTimeout = setTimeout(() => {
      setIsWaiting(false);
    }, delay);
    return () => clearTimeout(waitTimeout);
  }, [delay]);

  useEffect(() => {
    if (isWaiting) return;

    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) {
              newLines[currentLineIndex] = '';
            }
            newLines[currentLineIndex] += currentLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, speed * 10); // Wait a bit before starting the next line
        return () => clearTimeout(timeout);
      }
    }
  }, [isWaiting, currentLineIndex, currentCharIndex, lines, speed]);

  return (
    <div className="font-mono text-sm md:text-base text-cyan-400 opacity-80 bg-black/60 p-4 border border-cyan-500/20 rounded-sm">
      {displayedLines.map((line, idx) => (
        <div key={idx} className="flex">
          <span className="text-gray-500 mr-2">{'>'}</span>
          <span>{line}</span>
          {idx === currentLineIndex && currentCharIndex < lines[currentLineIndex]?.length && (
            <span className="w-2 h-4 bg-cyan-400 inline-block ml-1 animate-pulse"></span>
          )}
        </div>
      ))}
      {currentLineIndex >= lines.length && (
        <div className="flex">
          <span className="text-gray-500 mr-2">{'>'}</span>
          <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse"></span>
        </div>
      )}
    </div>
  );
}
