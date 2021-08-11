import { useMemo } from 'react';
import useDispatch from './use-dispatch';
import { addConfirmCallback } from '../slices/global';

type UseConfirm = (
  message: string,
  callback: () => void | Promise<void>,
) => void;

const useConfirm = (): UseConfirm => {
  const dispatch = useDispatch();
  const confirm = useMemo(
    () => (message: string, callback: () => void): void => {
      dispatch(addConfirmCallback({ message, callback }));
    },
    [dispatch],
  );

  return confirm;
};

export default useConfirm;
