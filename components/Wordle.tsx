import { useWordle } from '../hooks/useWordle';
import React, { useEffect, useState } from 'react';
import { Letter } from './Letter';
import {
  LetterCheck,
  LetterCheckResult,
  MAX_TURNS,
  Result,
  WORD_LENGTH,
} from '../model';
import { Modal } from '../layout/Modal';
import { faker } from '@faker-js/faker';

export const Wordle = () => {
  const [solution, setSolution] = useState<string | null>(null);

  useEffect(() => {
    setSolution(getSolution());
  }, []);

  const getSolution = (): string => {
    faker.locale = 'it';

    let solution = '';
    do {
      solution = faker.name.firstName('female');
    } while (solution.length !== WORD_LENGTH);
    return solution.toLowerCase();
  };

  const { currentGuess, history, keyupHandler, result, reset } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', keyupHandler);

    return () => window.removeEventListener('keyup', keyupHandler);
  }, [keyupHandler]);

  const resetGame = () => {
    const newSolution = getSolution();
    setSolution(newSolution);
    reset(newSolution);
  };

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
      {solution && (
        <>
          Solution: {solution}
          <hr></hr>
        </>
      )}
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
      {history.length < MAX_TURNS - (currentGuess ? 1 : 0) &&
        [0, 1, 2, 3, 4]
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
      {result && (
        <Modal
          message={
            result === Result.WIN ? (
              <>
                <p>Hai vinto!</p>
                <button onClick={resetGame}>Ricomincia</button>
              </>
            ) : (
              <>
                Game over.
                <p>Solution: {solution}</p>
                <button onClick={resetGame}>Ricomincia</button>
              </>
            )
          }
        />
      )}
    </React.Fragment>
  );
};
