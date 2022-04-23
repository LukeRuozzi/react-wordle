import { useEffect, useState } from 'react';
import {
  HistoryGuess,
  LetterCheck,
  LetterCheckResult,
  WORD_LENGTH,
} from '../model';

export const useWordle = (solution: string) => {
  const [history, setHistory] = useState<HistoryGuess[]>([]);
  const [wordsHistory, setWordsHistory] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string | null>(null);

  const checkGuess = () => {
    const guess: HistoryGuess = {
      letters: [],
    };
    for (let i = 0; i < 5; i++) {
      const guessLetter = currentGuess.charAt(i);
      let result = LetterCheckResult.NONE;
      if (solution.charAt(i) === guessLetter) {
        result = LetterCheckResult.MATCH_FULL;
      } else if (solution.indexOf(guessLetter) !== -1) {
        result = LetterCheckResult.MATCH_PARTIAL;
      }

      const guessHistory: LetterCheck = {
        letter: guessLetter,
        result,
      };
      guess.letters.push(guessHistory);
    }
    setHistory([...history, guess]);
    setCurrentGuess(null);

    setWordsHistory([
      ...wordsHistory,
      guess.letters.map((l) => l.letter.toLowerCase()).join(''),
    ]);
  };

  const keyupHandler = (e) => {
    //console.log(e.key);

    if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (
      e.key === 'Enter' &&
      currentGuess &&
      currentGuess.length === WORD_LENGTH &&
      wordsHistory.indexOf(currentGuess.toLowerCase()) === -1
    ) {
      checkGuess();
    } else if (
      /^[A-Za-z]$/.test(e.key) &&
      (!currentGuess || currentGuess.length < WORD_LENGTH)
    ) {
      setCurrentGuess((prev) => (prev ? prev : '') + e.key);
    }
  };

  return {
    currentGuess,
    history,
    keyupHandler,
  };
};
