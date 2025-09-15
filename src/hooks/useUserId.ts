import { useAppSelector } from '../redux/types/core.ts';

const useUserId = () => {
  return useAppSelector(state=>state.user.userId);
};

export default useUserId;