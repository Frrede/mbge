import axios, { AxiosResponse } from 'axios';
import { GambleResult } from '../models/gamble-result';
import { ScoreList } from '../models/score-list';

const BACKEND_URL = 'http://localhost:8080';

export async function gamble(name: string): Promise<AxiosResponse<GambleResult>> {
  return axios.post(BACKEND_URL + '/score', {
    name
  });
}

export async function getHighScoreList(): Promise<AxiosResponse<ScoreList>> {
  return axios.get(BACKEND_URL + '/score');
}
