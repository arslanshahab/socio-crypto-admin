import { useSelector } from 'react-redux';
import { RootStoreState } from '../store/reducers';
import { UserData } from '../types.d';

const useStoreUserSelector = (): UserData => {
  const selectUser = (state: RootStoreState) => state.user;
  return useSelector(selectUser);
};

export default useStoreUserSelector;
