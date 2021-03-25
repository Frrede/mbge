import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import {HighScoreList} from './HighScoreList';

describe('HighScoreList', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <HighScoreList scoreList={{
        scoreList: [
          {
            name: 'Foo',
            value: 10
          },
          {
            name: 'Bar',
            value: 5
          }
        ]
      }} />
    );
  });

  describe('first row', () => {
    let row: HTMLElement;

    beforeEach(() => {
      row = renderResult.getByTestId('high-score-row-Foo');
    });

    it('should render place correctly', () => {
      expect(row.childNodes.item(0)).toHaveTextContent('1');
    });

    it('should render name correctly', () => {
      expect(row.childNodes.item(1)).toHaveTextContent('Foo');
    });

    it('should render value correctly', () => {
      expect(row.childNodes.item(2)).toHaveTextContent('10');
    });
  });

  describe('second row', () => {
    let row: HTMLElement;

    beforeEach(() => {
      row = renderResult.getByTestId('high-score-row-Bar');
    });

    it('should render place correctly', () => {
      expect(row.childNodes.item(0)).toHaveTextContent('2');
    });

    it('should render name correctly', () => {
      expect(row.childNodes.item(1)).toHaveTextContent('Bar');
    });

    it('should render value correctly', () => {
      expect(row.childNodes.item(2)).toHaveTextContent('5');
    });
  });
});
