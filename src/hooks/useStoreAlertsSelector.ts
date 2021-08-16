import { useSelector } from 'react-redux';
import { RootStoreState } from '../store/reducers';
import { StoreAlerts } from '../types.d';

const useStoreUIAlertsSelector = (): StoreAlerts => {
  const selectStoreAlerts = (state: RootStoreState) => state.alerts;
  return useSelector(selectStoreAlerts);
};

export default useStoreUIAlertsSelector;
