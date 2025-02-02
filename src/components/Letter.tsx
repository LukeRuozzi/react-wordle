import { LetterCheckResult } from '../../model.ts';
import React, { useEffect } from 'react';

type ComponentProps = {
  letter: string;
  result: LetterCheckResult;
};

export const Letter = ({ letter, result }: ComponentProps) => {
  let className = '';
  switch (result) {
    case LetterCheckResult.UNDEFINED:
      className = 'letter';
      break;
    case LetterCheckResult.NONE: {
      className = 'letter letter-none';
      break;
    }
    case LetterCheckResult.MATCH_FULL: {
      className = 'letter letter-full';
      break;
    }
    case LetterCheckResult.MATCH_PARTIAL: {
      className = 'letter letter-partial';
      break;
    }
  }

  return <div className={className}>{letter}</div>;
};
