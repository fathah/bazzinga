import { useAppSelector } from '../redux/types/core.ts';

const useUserId = () => {
  return useAppSelector(state => state.user.userId);
};

const useUserToken = () => {
  return useAppSelector(state => state.user.token);
};

export { useUserId, useUserToken };
