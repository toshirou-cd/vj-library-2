import React, { PropsWithChildren, useMemo, useState } from 'react';
import {
  SemanticCOLORS,
  Dimmer,
  Loader,
  Button,
  List,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { deburr } from '@app/utils/helpers';
import SearchBar from '../SearchBar';

const StyledHeader = styled(Header)`
  margin-top: 0;
  margin-bottom: 8px;
  margin-right: auto;
`;
const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
const ListActionButton = styled(Button)`
  display: flex;
  padding: 9px !important;
  margin-right: 0 !important;
  margin-left: 9px !important;
  height: ${(props: { search: string }): string =>
    props.search === 'true' ? 'auto' : '36px'};
`;
const StyledSearchBar = styled(SearchBar)`
  flex: 1 1 0%;
`;
const IconButton = styled(Button)`
  line-height: 0 !important;
  margin-left: 10px;
  margin-top: 2px !important;
  margin-right: 0 !important;
  padding: 10px !important;
`;
const BorderedList = styled(List)`
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-top: 0 !important;
  border-bottom: 0 !important;
  border-radius: 5px;
  margin-top: 8px !important;
`;
const StyledListContent = styled(List.Content)`
  margin-left: 0.25em !important;
`;

interface Action {
  title: string;
  icon: JSX.Element;
  color: SemanticCOLORS;
}

interface ListAction<T> extends Action {
  onClick: (data: T[]) => void;
}

interface ItemAction<T> extends Action {
  onClick: (data: T) => void;
}

interface Props<T extends object> {
  data: T[];
  loading?: boolean;
  search?: boolean;
  toggle?: boolean;
  title?: string | JSX.Element;
  listActions?: ListAction<T>[];
  itemActions?: ItemAction<T>[];
  getRowKey: (data: T) => string | number;
  itemHeaderRender: (d: T) => string;
  itemContentRender?: (d: T) => string;
  onRowClick?: (data: T) => void;
}

const DataList: <T extends object>(
  props: PropsWithChildren<Props<T>>,
) => JSX.Element = (props) => {
  const {
    data,
    loading,
    search,
    title,
    listActions,
    itemActions,
    itemHeaderRender,
    itemContentRender,
    onRowClick,
    getRowKey,
    toggle,
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const searchBar = useMemo(() => {
    if (search) {
      return <StyledSearchBar size="small" onChange={setSearchValue} />;
    }
    return null;
  }, [search]);

  type T = typeof data[0];
  const filteredData: T[] = useMemo(() => {
    if (searchValue) {
      const result = data.filter((r) => {
        const found = Object.values(r).find((v) =>
          deburr(`${v}`).toLowerCase().includes(searchValue.toLowerCase()),
        );
        return found;
      });
      return result;
    }
    return data;
  }, [data, searchValue]);

  const [selecting, setSelecting] = useState<string | number>();

  return (
    <div>
      <Dimmer inverted active={loading}>
        <Loader />
      </Dimmer>

      {search && <StyledHeader as="h3">{title}</StyledHeader>}
      <FlexWrapper>
        {search && searchBar}
        {!search && <StyledHeader as="h3">{title}</StyledHeader>}
        {listActions?.map((action) => (
          <ListActionButton
            icon
            basic
            search={`${search}`}
            key={`${action.title}-${action.color}`}
            title={action.title}
            color={action.color}
            content={action.icon}
            disabled={loading}
            onClick={action.onClick}
          />
        ))}
      </FlexWrapper>

      <BorderedList selection celled verticalAlign="middle">
        {filteredData.map((d) => (
          <List.Item
            key={getRowKey(d)}
            active={selecting === getRowKey(d)}
            onClick={(): void => {
              onRowClick?.(d);
              if (toggle) {
                if (selecting === getRowKey(d)) {
                  setSelecting(undefined);
                } else {
                  setSelecting?.(getRowKey(d));
                }
              }
            }}
          >
            {itemActions?.map((action) => (
              <StyledListContent
                key={`${action.color}-${action.title}`}
                floated="right"
              >
                <IconButton
                  icon
                  basic
                  key={`${action.title}-${action.color}`}
                  color={action.color}
                  title={action.title}
                  content={action.icon}
                  disabled={loading}
                  onClick={(e: MouseEvent): void => {
                    e.stopPropagation();
                    action.onClick(d);
                  }}
                />
              </StyledListContent>
            ))}
            <List.Content>
              <List.Header>{itemHeaderRender(d)}</List.Header>
              {itemContentRender?.(d)}
            </List.Content>
          </List.Item>
        ))}
      </BorderedList>
    </div>
  );
};

export default DataList;
