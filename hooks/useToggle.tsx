import {useState} from 'react';

enum TOGGLE_HANDLERS {
  ON = 'on',
  OFF = 'off',
  TOGGLE = 'toggle',
  RESET = 'reset',
}

export const useToggle = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);
  const handlers = {
    [TOGGLE_HANDLERS.ON]: () => setState(true),
    [TOGGLE_HANDLERS.OFF]: () => setState(false),
    [TOGGLE_HANDLERS.TOGGLE]: () => setState(s => !s),
    [TOGGLE_HANDLERS.RESET]: () => setState(initialState),
  };
  return {state, handlers};
};
