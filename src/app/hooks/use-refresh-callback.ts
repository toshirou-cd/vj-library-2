import { useEffect } from 'react';
import useDispatch from './use-dispatch';
import { addComponentRefreshCallback } from '../slices/global';

const useRefreshCallback = (
  groupKey: string,
  key: string,
  callback: () => void,
): void => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addComponentRefreshCallback({ groupKey, key, callback }));
  }, [dispatch, groupKey, key, callback]);
};

export default useRefreshCallback;
