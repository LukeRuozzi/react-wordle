import { useEffect, useState } from 'react';
import {
  HistoryGuess,
  LetterCheck,
  LetterCheckResult,
  MAX_TURNS,
  Result,
} from '../model';

export const useWordle = (solution: string) => {
  const [history, setHistory] = useState<HistoryGuess[]>([]);
  const [wordsHistory, setWordsHistory] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [turns, setTurns] = useState(0);

  const WORD_LENGTH = solution.length;

  const checkGuess = () => {
    const guess: HistoryGuess = {
      letters: [],
    };
    for (let i = 0; i < WORD_LENGTH; i++) {
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

    const completeWord = guess.letters
      .map((l) => l.letter.toLowerCase())
      .join('');

    if (completeWord === solution) {
      setResult(Result.WIN);
    } else if (turns === MAX_TURNS - 1) {
      setResult(Result.LOSE);
    } else {
      setTurns(turns + 1);
    }

    setCurrentGuess(null);

    setWordsHistory([...wordsHistory, completeWord]);
  };

  const keyupHandler = (e) => {
    //console.log(e.key);

    if (result) {
      return;
    }

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
    result,
  };
};
