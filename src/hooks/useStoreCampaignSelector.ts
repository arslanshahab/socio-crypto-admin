import { useSelector } from 'react-redux';
import { RootStoreState } from '../store/reducers';
import { CampaignState } from '../types.d';

const useStoreUIAlertsSelector = (): CampaignState => {
  const selectStoreAlerts = (state: RootStoreState) => state.newCampaign;

  return useSelector(selectStoreAlerts);
};

export default useStoreUIAlertsSelector;
