import axios from 'axios';
import { gamble, getHighScoreList } from './score.service';

jest.mock('axios');

const TEST_NAME = 'Testy McTest';

describe('Score Service', () => {
  describe('when calling gamble', () => {
    beforeEach(() => {
      gamble(TEST_NAME);
    });

    it('should post data to backend', () => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/score',
        {
          name: TEST_NAME
        }
      );
    });
  });

  describe('when calling getHighScoreList', () => {
    beforeEach(() => {
      getHighScoreList();
    });

    it('should post data to backend', () => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/score');
    });
  });
});
