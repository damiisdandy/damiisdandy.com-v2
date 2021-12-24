import { useGlobalStoreContext } from '../context';

type UseColorMode = () => UseColorModeReturn;

interface UseColorModeReturn {
  isLightMode: boolean;
  toggleMode: () => void;
  setColorMode: (mode: 'light' | 'dark') => void;
}

const useColorMode: UseColorMode = () => {
  const { state, dispatch } = useGlobalStoreContext();
  return {
    isLightMode: state.isLightmode,
    toggleMode: () => dispatch({ type: 'TOGGLE_MODE' }),
    setColorMode: mode => dispatch({ type: 'SET_MODE', payload: mode }),
  };
};

export default useColorMode;
