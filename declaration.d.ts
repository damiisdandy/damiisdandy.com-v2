declare module '*.scss';

interface Seo {
  title?: string;
  image?: string;
  description?: string;
  article?: boolean;
  author?: string;
}

interface Store {
  isLightmode: boolean;
  isSidebarOpen: boolean;
}
type ActionTypes = 'INIT' | 'TOGGLE_MODE' | 'SET_MODE' | 'TOGGLE_SIDEBAR' | 'SET_SIDEBAR';

interface Action {
  type: ActionTypes;
  payload?: any;
}

type Reducer = (state: Store, action: Action) => Store;
