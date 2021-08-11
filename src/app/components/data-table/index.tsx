/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren, useMemo, useEffect, useState } from 'react';
import { Table, Header, Dimmer, Loader, Button } from 'semantic-ui-react';
import {
  FiChevronDown,
  FiChevronRight,
  FiCornerLeftUp,
  FiSlash,
} from 'react-icons/fi';

import {
  useTable,
  usePagination,
  useExpanded,
  useRowSelect,
  useGroupBy,
  UseExpandedState,
  UsePaginationState,
  UseGroupByColumnProps,
  UseGroupByCellProps,
  UseGroupByRowProps,
  UseExpandedRowProps,
} from 'react-table';
import styled from 'styled-components';

import { filterArray } from '@app/utils/helpers';

import Pagination from './Pagination';
import ExpanderCell from './ExpanderCell';
import HeaderCheckbox from './HeaderCheckbox';
import RowCheckbox from './RowCheckbox';
import Action from './Action';
import SearchBar from '../SearchBar';
import {
  Props,
  Column as IColumn,
  TableOptions,
  DataTableInstance as IDataTableInstance,
} from './types';

// #region styled
const Wrapper = styled.div`
  position: relative;
  .ui.sortable.table thead th {
    border-left: none;
  }
`;
const TableWrapper = styled.div`
  table {
    margin-top: 0 !important;
  }
`;
const SearchBarWrapper = styled.div`
  margin-bottom: 8px;
  
`;
const ToolbarWrapper = styled.div`
  display: flex;
  padding: 0 0 8px 0;
`;
const TableHeader = styled(Header)`
  margin-bottom: 0 !important;
  font-size: 28px !important;
`;
const ActionsWrapper = styled.div`
  margin-left: auto;
`;
const ExpandCell = styled(Table.Cell)`
  background: rgba(34, 36, 38, 0.05);
  padding-left: 50px !important;
`;
const StyledIconButton = styled(Button)`
  width: 30px;
  height: 30px;
  padding: 3px !important;
  background: transparent !important;
`;
const iconButton = (Icon: React.FC, props: object) => (
  <StyledIconButton icon={<Icon />} {...props} />
);
// #endregion

const DataTable: <T extends object>(
  props: PropsWithChildren<Props<T>>,
) => JSX.Element = (props) => {
  // #region columns and data
  const {
    data,
    columns: propColumns,
    pageCount: controlledPageCount,
    totalCount,
  } = props;

  type T = typeof data[0];
  type DataTableInstance = IDataTableInstance<T>;

  const { subComponent } = props;
  const columns = useMemo(
    () =>
      propColumns.map((c) => ({
        Header: c.header,
        accessor: c.accessor,
        aggregate: c.aggregate,
        Aggregated: c.renderAggregated,
      })),
    [propColumns],
  );

  const [searchValue, setSearchValue] = useState('');
  const filteredData = useMemo(() => filterArray(data, searchValue), [
    data,
    searchValue,
  ]);

  const options: TableOptions<T> = {
    columns,
    data: filteredData,

    pageCount: controlledPageCount,
    manualPagination: Boolean(controlledPageCount),
    autoResetPage: false,
    pageSize: 5,
    pageIndex: 0,
  };

  const { selectable = false, rowActions = [] } = props;
  const tableInstance = useTable(
    options,
    useGroupBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (subComponent) {
        hooks.visibleColumns.push((visibleColumns) => [
          { id: 'expander', Header: () => null, Cell: ExpanderCell },
          ...visibleColumns,
        ]);
      }
      if (selectable) {
        hooks.visibleColumns.push((visibleColumns) => [
          { id: 'selection', Header: HeaderCheckbox, Cell: RowCheckbox },
          ...visibleColumns,
        ]);
      }
      if (rowActions.length > 0) {
        hooks.visibleColumns.push((visibleColumns) => [
          ...visibleColumns,
          {
            id: 'action',
            Header: (): null => null,
            Cell: (table: DataTableInstance) =>
              rowActions.map((a) => (
                <Action
                  key={`${a.title}|${a.color ?? 'rainbow'}`}
                  data={table.row.original}
                  icon={a.icon}
                  color={a.color}
                  title={a.title}
                  onClick={a.onClick}
                  hidden={a.hidden}
                  disabled={a.disabled}
                  dropdown={a.dropdown}
                  dropdownActions={a.dropdownActions}
                />
              )),
          },
        ]);
      }
    },
  ) as DataTableInstance;
  // #endregion

  // #region search
  const { search = false, onSearch } = props;
  useEffect(() => {
    if (onSearch && searchValue) {
      onSearch(searchValue);
    }
  }, [onSearch, searchValue]);

  const searchNode = useMemo(
    () =>
      search ? (
        <SearchBarWrapper>
          <SearchBar onChange={(v): void => setSearchValue(v)} />
        </SearchBarWrapper>
      ) : null,
    [search],
  );
  // #endregion

  // #region pagination
  const {
    pageCount,
    gotoPage,
    setPageSize,
    state: paginationState,
  } = tableInstance;
  const { pageIndex, pageSize } = paginationState as UsePaginationState<T>;
  const { noPaging = false, onPaginationChange } = props;
  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange({ pageIndex, pageSize });
    }
  }, [onPaginationChange, pageIndex, pageSize]);

  const paginationNode = useMemo(
    () =>
      !noPaging ? (
        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          totalCount={totalCount || data.length}
          gotoPage={gotoPage}
          setPageSize={setPageSize}
        />
      ) : null,
    [
      noPaging,
      pageIndex,
      pageSize,
      pageCount,
      totalCount,
      data.length,
      gotoPage,
      setPageSize,
    ],
  );
  // #endregion

  // #region selectable actions
  const { selectedFlatRows } = tableInstance;
  const { tableActions } = props;
  const tableActionsNode = useMemo(
    () => (
      <ActionsWrapper>
        {selectable && (
          <span>{`Đã chọn: ${selectedFlatRows.length} dòng  `}</span>
        )}
        {tableActions?.map((a) => (
          <Action
            key={`${a.title}|${a.color ?? 'rainbow'}`}
            data={selectedFlatRows.map((r) => r.original)}
            icon={a.icon}
            color={a.color}
            title={a.title}
            onClick={a.onClick}
            hidden={a.hidden}
            disabled={a.disabled}
            dropdown={a.dropdown}
            dropdownActions={a.dropdownActions}
          />
        ))}
      </ActionsWrapper>
    ),
    [tableActions, selectedFlatRows, selectable],
  );
  // #endregion

  // #region render
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    state: tableState,
  } = tableInstance;

  const { expanded } = tableState as UseExpandedState<T>;
  const expandedRowKeys = useMemo(
    () => Object.keys(expanded).map((k) => `row_${k}`),
    [expanded],
  );
  const {
    title,
    striped = false,
    loading = false,
    groupBy = false,
    rowError,
    onRowClick,
  } = props;
  return (
    <Wrapper>
      <Dimmer inverted active={loading}>
        <Loader />
      </Dimmer>
      {searchNode}
      <ToolbarWrapper>
        {typeof title === 'string' && <TableHeader content={title} />}
        {typeof title !== 'string' && title}
        {tableActionsNode}
      </ToolbarWrapper>
      <TableWrapper>
        <Table
          sortable
          size="small"
          compact="very"
          striped={striped}
          role={getTableProps().role}
          selectable={Boolean(onRowClick)}
        >
          <Table.Header>
            {headerGroups.map((hg) => {
              const {
                key: headerGroupKey,
                role: headerGroupRole,
              } = hg.getHeaderGroupProps();

              return (
                <Table.Row key={headerGroupKey} role={headerGroupRole}>
                  {hg.headers.map((c) => {
                    const { key: rowKey, role: rowRole } = c.getHeaderProps();
                    // prettier-ignore
                    const columnWithGroupBy = c as unknown as UseGroupByColumnProps<T>;

                    return (
                      <Table.HeaderCell
                        key={rowKey}
                        role={rowRole}
                        content={
                          <>
                            {groupBy &&
                              columnWithGroupBy.canGroupBy &&
                              iconButton(
                                columnWithGroupBy.isGrouped
                                  ? FiSlash
                                  : FiCornerLeftUp,
                                columnWithGroupBy.getGroupByToggleProps(),
                              )}
                            {c.render('Header')}
                          </>
                        }
                      />
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Header>
          <Table.Body role={getTableBodyProps().role}>
            {page.map((r) => {
              prepareRow(r);
              const { key: rKey, role: rRole } = r.getRowProps();
              return (
                <React.Fragment key={rKey}>
                  <Table.Row
                    error={rowError && rowError(r.original)}
                    role={rRole}
                    onClick={(): void => {
                      if (onRowClick && r.original) {
                        onRowClick(r.original);
                      }
                    }}
                  >
                    {r.cells.map((c) => {
                      const { key: cKey, role: cRole } = c.getCellProps();
                      const accessor = (cKey as string).split('_')[2];
                      const render = propColumns.find(
                        (pc) => pc.accessor === accessor,
                      )?.render;

                      // prettier-ignore
                      const cellWithGroupBy = (c as unknown) as UseGroupByCellProps<T>;
                      // prettier-ignore
                      const rowWithGroupBy = (r as unknown) as UseGroupByRowProps<T>;
                      // prettier-ignore
                      const rowWithExpanded = (r as unknown) as UseExpandedRowProps<T>;
                      const cellNode = render
                        ? render(c.row.original)
                        : c.render('Cell');

                      let content: React.ReactNode = null;
                      if (groupBy && cellWithGroupBy.isGrouped) {
                        content = (
                          <>
                            {iconButton(
                              rowWithExpanded.isExpanded
                                ? FiChevronDown
                                : FiChevronRight,
                              rowWithExpanded.getToggleRowExpandedProps(),
                            )}
                            {cellNode}
                            {` (${rowWithGroupBy.subRows.length})`}
                          </>
                        );
                      } else if (cellWithGroupBy.isAggregated) {
                        content = c.render('Aggregated');
                      } else if (!cellWithGroupBy.isPlaceholder) {
                        content = cellNode;
                      }

                      const textAlign = `${cKey}`.includes('action')
                        ? 'right'
                        : 'left';

                      return (
                        <Table.Cell
                          key={cKey}
                          role={cRole}
                          content={content}
                          textAlign={textAlign}
                        />
                      );
                    })}
                  </Table.Row>

                  {/* expand */}
                  {subComponent && expandedRowKeys.includes(`${rKey}`) && (
                    <Table.Row>
                      <ExpandCell
                        colSpan={visibleColumns.length}
                        content={subComponent(r.original)}
                      />
                    </Table.Row>
                  )}
                </React.Fragment>
              );
            })}
          </Table.Body>
          {paginationNode}
        </Table>
      </TableWrapper>
    </Wrapper>
  );
  // #endregion
};

export type Column<T> = IColumn<T>;

// (DataTable as any).whyDidYouRender = true;
export default DataTable;
