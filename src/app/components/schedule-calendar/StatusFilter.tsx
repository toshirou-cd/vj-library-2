import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import styled from 'styled-components';

import { StatusMap } from './status-map';

const Wrapper = styled.div`
  .status-filter {
    cursor: pointer;
  }
`;

interface Props {
  statusMap?: StatusMap;
  onChange: (statusList: number[]) => void;
}

const StatusFilter: React.FC<Props> = (props) => {
  const { statusMap, onChange } = props;
  const [statusFilterList, setStatusFilterList] = useState<number[]>([]);
  useEffect(() => {
    onChange(statusFilterList);
  }, [onChange, statusFilterList]);

  return (
    <Wrapper>
      {statusMap &&
        Object.keys(statusMap).map((k) => {
          const status = parseInt(k, 10);
          return (
            <Label
              key={k}
              className="status-filter"
              basic={!statusFilterList.includes(status)}
              color={statusMap[status].color}
              content={statusMap[status].label}
              onClick={(): void => {
                setStatusFilterList((sfl) => {
                  if (sfl.includes(status)) {
                    return sfl.filter((s) => s !== status);
                  }
                  return [...sfl, status];
                });
              }}
            />
          );
        })}
    </Wrapper>
  );
};

export default React.memo(StatusFilter);
