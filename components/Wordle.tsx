import { useWordle } from '../hooks/useWordle';
import React, { useEffect } from 'react';
import { Letter } from './Letter';
import { LetterCheckResult } from '../model';

export const Wordle = () => {
  const solution = 'pippo';

  const { currentGuess, keyupHandler } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', keyupHandler);

    return () => window.removeEventListener('keyup', keyupHandler);
  }, [keyupHandler]);

  const printCurrentGuess = (): JSX.Element => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < 5; i++) {
      const letter = currentGuess.charAt(i);

      /*
      const rnd = Math.random();
      let result =
        rnd < 0.5
          ? LetterCheckResult.NONE
          : rnd > 0.7
          ? LetterCheckResult.MATCH_FULL
          : LetterCheckResult.MATCH_PARTIAL;
          */

      elements.push(
        <Letter
          key={i}
          letter={letter ? letter.toUpperCase() : ''}
          result={LetterCheckResult.NONE}
        />
      );
    }

    return <div className="guess-container">{elements}</div>;
  };

  return <>{currentGuess ? printCurrentGuess() : null}</>;
};
