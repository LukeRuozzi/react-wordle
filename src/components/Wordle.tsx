import { useWordle } from '../hooks/useWordle.tsx';
import React, { useEffect, useState } from 'react';
import { Letter } from './Letter.tsx';
import {
  LetterCheck,
  LetterCheckResult,
  MAX_TURNS,
  Result,
  WORD_LENGTH,
} from '../../model.ts';
import { Modal } from '../layout/Modal.tsx';
import { faker } from '@faker-js/faker';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

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
      //solution = faker.word.noun(5);
      //solution = faker.commerce.product();
    } while (solution.length !== WORD_LENGTH);
    return solution.toLowerCase();
  };

  const { currentGuess, history, keyupHandler, result, reset } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', (e) => keyupHandler(e.key));

    return () =>
      window.removeEventListener('keyup', (e) => keyupHandler(e.key));
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

  const onKeyPress = (button) => {
    keyupHandler(button);
    //console.log('Button pressed', button);
  };

  const layout = {
    default: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      'Backspace L Z X C V B N M Enter',
    ],
  };
  const display = {
    Backspace: '<',
    Enter: 'Vai',
  };

  return (
    <React.Fragment>
      {solution && false && (
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
      <Keyboard onKeyPress={onKeyPress} layout={layout} display={display} />
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
