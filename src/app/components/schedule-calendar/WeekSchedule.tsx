import React from 'react';
import { Table } from 'semantic-ui-react';
import styled, { css } from 'styled-components';

import moment from 'moment';

import AgendaCard from './AgendaCard';
import { WeekDay } from './week-day';
import { Agenda } from './agenda';
import { StatusMap } from './status-map';

const DayLabelWrapper = styled.span`
  cursor: pointer;
  &:hover {
    color: #fbbd08;
  }
  ${(props: { today?: boolean }) =>
    props.today &&
    css`
      color: #f9aa33;
    `}
`;
const StyledDayOfMonth = styled.h1`
  margin-top: 0;
`;

interface Props {
  weekDays: WeekDay[];
  data: Agenda[];
  statusMap?: StatusMap;
  onAgendaClick?: (id: Agenda['id']) => void;
  onDayHeaderClick: (day: WeekDay) => void;
}

const WeekSchedule: React.FC<Props> = (props) => {
  const { weekDays, data, statusMap, onAgendaClick, onDayHeaderClick } = props;

  return (
    <>
      <Table basic="very" size="small" fixed>
        <Table.Header>
          <Table.Row>
            {weekDays.map((d) => (
              <Table.HeaderCell
                key={d.dayOfMonth}
                textAlign="center"
                onClick={(): void => onDayHeaderClick(d)}
              >
                <DayLabelWrapper
                  today={moment().startOf('day').isSame(d.fullDate)}
                >
                  <span>{d.dayOfWeekLabel}</span>
                  <StyledDayOfMonth>{d.dayOfMonth}</StyledDayOfMonth>
                </DayLabelWrapper>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {weekDays.map((day) => {
              const agendaListInDay = data
                .filter((a) => {
                  const agendaDay = moment(a.date).format('DD-MM-YYYY');
                  const calendarDay = moment(day.fullDate).format('DD-MM-YYYY');

                  return agendaDay === calendarDay;
                })
                .sort((a, b) => (a.time < b.time ? -1 : 1));
              return (
                <Table.Cell key={day.dayOfMonth} verticalAlign="top">
                  {agendaListInDay.map((ac) => (
                    <AgendaCard
                      key={ac.id}
                      time={ac.time}
                      infoList={ac.infoList}
                      onClick={(): void => onAgendaClick?.(ac.id)}
                      statusColor={statusMap?.[ac.status]?.color}
                    />
                  ))}
                </Table.Cell>
              );
            })}
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default React.memo(WeekSchedule);
