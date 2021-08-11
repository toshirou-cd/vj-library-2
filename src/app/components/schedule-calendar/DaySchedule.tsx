import React, { useMemo } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import moment from 'moment';

import { Agenda } from './agenda';
import AgendaCard from './AgendaCard';
import { StatusMap } from './status-map';

const StyledGrid = styled(Grid)`
  padding: 0 10px !important;
  margin-top: 4px !important;
  & > .column:not(.row),
  > .row > .column {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  & .ui.message {
    width: 100%;
    margin-left: 8px;
    margin-right: 8px;
  }
`;

interface Props {
  date: Date;
  data: Agenda[];
  statusMap?: StatusMap;
  onAgendaClick?: (id: Agenda['id']) => void;
}

const DaySchedule: React.FC<Props> = (props) => {
  const { date, data, onAgendaClick, statusMap } = props;

  const agendaList = useMemo(
    () =>
      data
        .filter((a) => {
          const agendaDay = moment(a.date).format('DD-MM-YYYY');
          const calendarDay = moment(date).format('DD-MM-YYYY');

          return agendaDay === calendarDay;
        })
        .sort((a, b) => (a.time < b.time ? -1 : 1)),
    [date, data],
  );

  return (
    <StyledGrid>
      <Grid.Row>
        {agendaList.length === 0 && (
          <Message info header="Danh sách phiếu hẹn trống" />
        )}
        {agendaList.map((ac) => (
          <Grid.Column key={ac.id} mobile={16} tablet={4} computer={2}>
            <AgendaCard
              time={ac.time}
              infoList={ac.infoList}
              onClick={(): void => onAgendaClick?.(ac.id)}
              statusColor={statusMap?.[ac.status]?.color}
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    </StyledGrid>
  );
};

export default DaySchedule;
