import React, { useState, useEffect, useMemo } from 'react';
import { Dimmer, Loader, Grid, Button } from 'semantic-ui-react';
import { FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';

import moment from 'moment';

import { DatePicker, WeekPicker } from '@app/components/date-picker';
import SearchBar from '@app/components/SearchBar';

import { deburr } from '@app/utils/helpers';

import WeekSchedule from './WeekSchedule';
import StatusFilter from './StatusFilter';
import DaySchedule from './DaySchedule';

import { WeekDay, getWeekDayLabel } from './week-day';
import { StatusMap as IStatusMap } from './status-map';
import { Agenda as IAgenda } from './agenda';

const Container = styled.div`
  position: relative;
  padding: 6px;
  background: #ffffff;
  .toolbar {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .ui.grid > .row {
    padding: 0;
  }
  .ui.table td {
    padding: 6px !important;
  }
  .ui.table thead th {
    padding-bottom: 0;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  .dp {
    width: 140px;
    margin-right: 10px;
  }
  svg {
    vertical-align: bottom;
    margin-right: 8px !important;
  }
`;

const calculateWeekDays = (startDate: Date): WeekDay[] => {
  const result: WeekDay[] = [];
  const weekStartDate = moment(startDate).startOf('isoWeek').toDate();

  for (let i = 2; i <= 8; i += 1) {
    const date = moment(weekStartDate).add(i - 2, 'days');
    const day: WeekDay = {
      dayOfWeekLabel: getWeekDayLabel(date.get('day')),
      dayOfMonth: date.format('DD'),
      fullDate: date.toDate(),
    };

    result.push(day);
  }

  return result;
};

interface Props {
  loading?: boolean;
  agendaList: IAgenda[];
  statusMap?: IStatusMap;
  weekStartDate?: Date;
  onWeekChange?: (from: Date, to: Date) => void;
  onAgendaClick?: (id: IAgenda['id']) => void;
}

const defaultWeekStartDate = moment().startOf('isoWeek').toDate();
const ScheduleCalendar: React.FC<Props> = (props) => {
  const {
    loading,
    agendaList,
    statusMap,
    onWeekChange,
    onAgendaClick,
    weekStartDate: weekStartDateProp,
  } = props;

  const [weekStartDate, setWeekStartDate] = useState(
    weekStartDateProp ?? defaultWeekStartDate,
  );
  useEffect(() => {
    if (weekStartDateProp) {
      setWeekStartDate(weekStartDateProp);
    }
  }, [weekStartDateProp]);
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  useEffect(() => {
    setWeekDays(calculateWeekDays(weekStartDate));
  }, [weekStartDate]);

  const [statusFilterList, setStatusFilterList] = useState<number[]>([]);
  const filterList = useMemo(
    () => <StatusFilter statusMap={statusMap} onChange={setStatusFilterList} />,
    [statusMap],
  );

  const [searchValue, setSearchValue] = useState('');
  const [filteredAgendaList, setFilteredAgendaList] = useState(agendaList);
  useEffect(() => {
    setFilteredAgendaList(
      agendaList.filter((a) => {
        const includeSearchValue = a.infoList.some((info) =>
          deburr(info.content).includes(deburr(searchValue)),
        );
        const includeStatusFilter =
          statusFilterList.length === 0 || statusFilterList.includes(a.status);

        return includeSearchValue && includeStatusFilter;
      }),
    );
  }, [agendaList, searchValue, statusFilterList]);

  const [selectedDay, setSelectedDay] = useState<Date>();

  return (
    <Container>
      <Dimmer inverted active={loading}>
        <Loader />
      </Dimmer>
      <SearchBar onChange={(s): void => setSearchValue(s)} size="small" />
      <Grid className="toolbar">
        <Grid.Row>
          <Grid.Column width={6}>
            {!selectedDay && (
              <WeekPicker
                weekStartDate={weekStartDate}
                onChange={({ from, to }): void => {
                  setWeekStartDate(from);
                  onWeekChange?.(from, to);
                }}
              />
            )}
            {selectedDay && (
              <FlexDiv>
                <div className="dp">
                  <DatePicker
                    value={selectedDay}
                    onChange={(d): void => setSelectedDay(d)}
                  />
                </div>
                <Button
                  content="Lịch tuần"
                  icon={<FiArrowLeft />}
                  onClick={(): void => setSelectedDay(undefined)}
                />
              </FlexDiv>
            )}
          </Grid.Column>
          <Grid.Column width={10} textAlign="right">
            {filterList}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {!selectedDay && (
        <WeekSchedule
          weekDays={weekDays}
          data={filteredAgendaList}
          statusMap={statusMap}
          onAgendaClick={onAgendaClick}
          onDayHeaderClick={(d): void => setSelectedDay(d.fullDate)}
        />
      )}
      {selectedDay && (
        <DaySchedule
          date={selectedDay}
          data={filteredAgendaList}
          statusMap={statusMap}
          onAgendaClick={onAgendaClick}
        />
      )}
    </Container>
  );
};

export default ScheduleCalendar;
export type StatusMap = IStatusMap;
export type Agenda = IAgenda;
