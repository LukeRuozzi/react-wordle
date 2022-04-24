export enum LetterCheckResult {
  UNDEFINED,
  NONE,
  MATCH_FULL,
  MATCH_PARTIAL,
}

export interface LetterCheck {
  letter: string;
  result: LetterCheckResult;
}

export interface HistoryGuess {
  letters: LetterCheck[];
}

export enum Result {
  WIN = 'W',
  LOSE = 'L',
}

export const MAX_TURNS = 5;
export const WORD_LENGTH = 5;
