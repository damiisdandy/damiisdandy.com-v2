declare module '*.scss';

interface Seo {
  title?: string;
  image?: string;
  description?: string;
  article?: boolean;
  author?: string;
  date?: string;
}

interface Store {
  isLightmode: boolean;
}
type ActionTypes = 'INIT' | 'TOGGLE_MODE' | 'SET_MODE';

interface Action {
  type: ActionTypes;
  payload?: any;
}

type Reducer = (state: Store, action: Action) => Store;
