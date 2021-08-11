import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

type UseFetchApi = {
  fetching: boolean;
  fetch: <T>(serviceFunc: Promise<T>) => Promise<T>;
};

const useFetchApi = (): UseFetchApi => {
  const [requestUuidList, setRequestUuidList] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);

  const fetchCB = async <T>(
    servicePromise: Promise<T>,
    hasIndicator = true,
  ): Promise<T> => {
    const uuid = uuidv4();

    if (hasIndicator) {
      setRequestUuidList((list) => [...list, uuid]);
    }

    let result = (Promise as unknown) as T;
    try {
      result = await servicePromise;
    } catch (error) {
      setFailed(true);
    }

    if (hasIndicator || failed) {
      setRequestUuidList((list) => list.filter((rId) => rId !== uuid));
      setFailed(false);
    }

    return result;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetch = useMemo(() => fetchCB, []);

  return {
    fetching: requestUuidList.length > 0,
    fetch,
  };
};

export default useFetchApi;
