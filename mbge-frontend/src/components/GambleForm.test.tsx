import React from 'react';
import {render, RenderResult, fireEvent, act} from '@testing-library/react';
import {GambleForm} from './GambleForm';

const TEST_NAME = 'Testy McTest';

describe('GambleForm', () => {
  let renderResult: RenderResult;
  let onGambleMock: jest.Mock;

  beforeEach(() => {
    onGambleMock = jest.fn();
    renderResult = render(
      <GambleForm onGamble={onGambleMock}/>
    );
  });

  describe('when gamble button gets clicked', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(renderResult.getByTestId('gamble-button'));
      });
    });

    it('should show name is required error', () => {
      expect(renderResult.baseElement).toHaveTextContent('Name is required')
    });

    it('should not trigger callback', () => {
      expect(onGambleMock).not.toHaveBeenCalled();
    });
  });

  describe('when a names gets entered', () => {

    beforeEach(async () => {
      await act(async () => {
        fireEvent.change(renderResult.getByTestId('gamble-input'), { target: { value: TEST_NAME } });
      });
    });

    describe('and gamble button gets clicked', () => {
      beforeEach(async () => {
        await act(async () => {
          fireEvent.click(renderResult.getByTestId('gamble-button'));
        });
      });

      it('should trigger callback', () => {
        expect(onGambleMock).toHaveBeenCalledWith(TEST_NAME);
      });
    });
  });
});
