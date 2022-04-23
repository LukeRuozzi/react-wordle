import { useState } from 'react';

type ComponentProps = {
  solution: string;
};

export const useWordle = ({ solution }: ComponentProps) => {
  const [currentGuess, setCurrentGuess] = useState<string | null>(null);

  const keyupHandler = (e) => {
    //console.log(e.key);

    if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (
      /^[A-Za-z]$/.test(e.key) &&
      (!currentGuess || currentGuess.length < 5)
    ) {
      setCurrentGuess((prev) => (prev ? prev : '') + e.key);
    }
  };

  return {
    currentGuess,
    keyupHandler,
  };
};
