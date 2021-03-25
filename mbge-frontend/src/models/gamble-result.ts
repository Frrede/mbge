import { Score } from './score';

export interface GambleResult {
  result: ScoreResultType;
  score: Score;
}

export enum ScoreResultType {
  NEW_HIGH_SCORE="NEW_HIGH_SCORE",
  NO_NEW_HIGH_SCORE = "NO_NEW_HIGH_SCORE"
}
