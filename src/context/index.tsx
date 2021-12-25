import React, {
  createContext,
  Dispatch,
  ReactChild,
  useContext,
  useReducer,
} from 'react';

import Reducer from './reducer';

export const initialState: Store = {
  isLightmode: false,
  isSidebarOpen: false,
};

export const globalStoreContext = createContext<{
  state: Store;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const GlobalStoreProvider = ({ children }: { children: ReactChild }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <globalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </globalStoreContext.Provider>
  );
};

export const useGlobalStoreContext: () => {
  state: Store;
  dispatch: (action: Action) => void;
} = () => {
  const { state, dispatch } = useContext(globalStoreContext);
  return { state, dispatch };
};
