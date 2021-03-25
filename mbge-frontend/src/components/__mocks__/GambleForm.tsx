import React from 'react';
import {GambleFormProps} from '../GambleForm';

export function GambleForm(props: GambleFormProps) {

  function handleClick() {
    if (props.onGamble) {
      props.onGamble('New Name');
    }
  }

  return (
    <button onClick={handleClick} data-testid="gamble-form-mock-submit">Test</button>
  );
}
