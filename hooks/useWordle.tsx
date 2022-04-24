import { useEffect, useState } from 'react';
import {
  HistoryGuess,
  LetterCheck,
  LetterCheckResult,
  MAX_TURNS,
  Result,
  WORD_LENGTH,
} from '../model';

export const useWordle = (solution: string) => {
  const [history, setHistory] = useState<HistoryGuess[]>([]);
  const [wordsHistory, setWordsHistory] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [turns, setTurns] = useState(0);

  const reset = (solution: string) => {
    setHistory([]);
    setWordsHistory([]);
    setCurrentGuess(null);
    setResult(null);
    setTurns(0);
    solution = solution;
  };

  const checkGuess = () => {
    const guess: HistoryGuess = {
      letters: [],
    };
    for (let i = 0; i < WORD_LENGTH; i++) {
      const guessLetter = currentGuess.charAt(i).toLowerCase();
      let result = LetterCheckResult.NONE;

      /*
      console.log(
        guessLetter,
        solution.charAt(i),
        solution.indexOf(guessLetter)
      );
      */

      if (solution.charAt(i) === guessLetter) {
        result = LetterCheckResult.MATCH_FULL;
      } else {
        const letterIndex = solution.indexOf(guessLetter);
        if (letterIndex !== -1 && currentGuess[letterIndex] !== guessLetter) {
          result = LetterCheckResult.MATCH_PARTIAL;
        }
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

  const keyupHandler = (button) => {
    //console.log(e.key);

    if (result) {
      return;
    }

    if (button === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (
      button === 'Enter' &&
      currentGuess &&
      currentGuess.length === WORD_LENGTH &&
      wordsHistory.indexOf(currentGuess.toLowerCase()) === -1
    ) {
      checkGuess();
    } else if (
      /^[A-Za-z]$/.test(button) &&
      (!currentGuess || currentGuess.length < WORD_LENGTH)
    ) {
      setCurrentGuess((prev) => (prev ? prev : '') + button);
    }
  };

  return {
    currentGuess,
    history,
    keyupHandler,
    result,
    reset,
  };
};
