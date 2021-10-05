import { useSelector } from 'react-redux';
import { RootStoreState } from '../store/reducers';
import { StoreSettings } from '../types.d';

const useStoreSettingsSelector = (): StoreSettings => {
  const selectStoreSettings = (state: RootStoreState) => state.settings;
  return useSelector(selectStoreSettings);
};

export default useStoreSettingsSelector;
