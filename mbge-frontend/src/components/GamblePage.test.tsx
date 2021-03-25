import React from 'react';
import axios from 'axios';
import {ScoreList} from '../models/score-list';
import {render, RenderResult, act, fireEvent} from '@testing-library/react';
import {GamePage} from './GamePage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('./GambleForm');

const TEST_NAME = 'Testy McTest';

describe('GamblePage', () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    const scoreList: ScoreList = {
      scoreList: [
        {
          name: TEST_NAME,
          value: 10
        }
      ]
    };
    mockedAxios.get.mockImplementation(() => Promise.resolve({
      data: scoreList
    }));

    await act(async () => {
      renderResult = render(<GamePage/>);
    });
  });

  it('should initially call high scores', () => {
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('should pass score to high score list', async () => {
    expect(renderResult.getByTestId('high-score-list')).toHaveTextContent(TEST_NAME);
  });

  describe('when gamble callback gets triggered and a new high score results', () => {
    beforeEach(async () => {
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({
        data: {
          result: 'NEW_HIGH_SCORE',
          score: {
            name: 'New Name',
            value: 136
          }
        }
      }));

      await act(async () => {
        fireEvent.click(renderResult.getByTestId('gamble-form-mock-submit'));
      });
    });

    it('should cal backend with name', () => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/score',
        {
          name: 'New Name'
        }
      );
    });

    it('should show new high score message', () => {
      expect(renderResult.baseElement).toHaveTextContent('A new high score (136) !!!')
    });

    it('should reload high scores', () => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('when gamble callback gets triggered and no new high score results', () => {
    beforeEach(async () => {
      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({
        data: {
          result: 'NO_NEW_HIGH_SCORE',
          score: {
            name: 'New Name',
            value: 136
          }
        }
      }));

      await act(async () => {
        fireEvent.click(renderResult.getByTestId('gamble-form-mock-submit'));
      });
    });

    it('should show no new high score message', () => {
      expect(renderResult.baseElement).toHaveTextContent('No new high score (136) :(')
    });
  });
});
