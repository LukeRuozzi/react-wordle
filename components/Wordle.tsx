import { useWordle } from '../hooks/useWordle';
import React, { useEffect } from 'react';
import { Letter } from './Letter';
import {
  LetterCheck,
  LetterCheckResult,
  MAX_TURNS,
  WORD_LENGTH,
} from '../model';

export const Wordle = ({ solution }) => {
  const { currentGuess, history, keyupHandler } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', keyupHandler);

    return () => window.removeEventListener('keyup', keyupHandler);
  }, [keyupHandler]);

  const printGuess = (key: number, letters: LetterCheck[]): JSX.Element => {
    return (
      <div key={key} className="guess-container">
        {letters.map((letter, index) => (
          <Letter
            key={index}
            letter={letter ? letter.letter.toUpperCase() : ''}
            result={letter.result}
          />
        ))}
        {letters.length < WORD_LENGTH
          ? [0, 1, 2, 3, 4]
              .slice(-WORD_LENGTH + letters.length)
              .map((_, index) => (
                <Letter
                  key={index}
                  letter={''}
                  result={LetterCheckResult.UNDEFINED}
                />
              ))
          : null}
      </div>
    );
  };

  return (
    <React.Fragment>
      Solution: {solution}
      <hr></hr>
      {history &&
        history.length > 0 &&
        history.map((guess, index) => printGuess(index, guess.letters))}
      {currentGuess
        ? printGuess(
            history.length,
            currentGuess
              .split('')
              .map((r) => ({ letter: r, result: LetterCheckResult.UNDEFINED }))
          )
        : null}
      {[0, 1, 2, 3, 4]
        .slice(-MAX_TURNS + (currentGuess ? 1 : 0) + history.length)
        .map((_, index) =>
          printGuess(
            index,
            [1, 2, 3, 4, 5].map(() => ({
              letter: '',
              result: LetterCheckResult.UNDEFINED,
            }))
          )
        )}
    </React.Fragment>
  );
};
