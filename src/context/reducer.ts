import { initialState } from './';
import { CONTEXT_PERSIST_NAME } from '../config';

const reducer: Reducer = (state, action) => {
  const rawLocalData = localStorage.getItem(CONTEXT_PERSIST_NAME);
  const localData = rawLocalData ? JSON.parse(rawLocalData) : state;
  let returnValue: Store = { ...initialState, ...localData };
  switch (action.type) {
    case 'INIT':
      returnValue = { ...action.payload };
      break;
    case 'TOGGLE_MODE':
      returnValue = { ...state, isLightmode: !state.isLightmode };
      break;
    case 'SET_MODE':
      returnValue = {
        ...state,
        isLightmode: action.payload === 'light' ? true : false,
      };
      break;
    default:
      throw new Error(`No Action Type (${action.type})`);
  }
  localStorage.setItem(CONTEXT_PERSIST_NAME, JSON.stringify(returnValue));
  return returnValue;
};

export default reducer;
