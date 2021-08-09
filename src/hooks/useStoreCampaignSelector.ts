import { useSelector } from 'react-redux';
import { RootStoreState } from '../store/reducers';
import { CampaignState } from '../types.d';

const useStoreCampaignSelector = (): CampaignState => {
  const selectStoreCampaign = (state: RootStoreState) => state.newCampaign;

  return useSelector(selectStoreCampaign);
};

export default useStoreCampaignSelector;
