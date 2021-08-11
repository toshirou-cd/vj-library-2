import React from 'react';
import { Card, Label, SemanticCOLORS } from 'semantic-ui-react';
import { FiClock } from 'react-icons/fi';
import styled from 'styled-components';

import { Info } from './agenda';
import InfoRow from '../InfoRow';

const Wrapper = styled.div`
  margin-bottom: 12px;
  .label-icon {
    vertical-align: bottom;
    margin-right: 4px;
    font-size: 16px;
  }
  b.time {
    font-size: 16px;
  }
  .card div.content {
    padding: 8px !important;
    color: black;
  }
`;
const ContentWrapper = styled.div`
  padding-top: 28px;
`;

interface Props {
  time: string;
  infoList: Info[];
  statusColor?: SemanticCOLORS;
  onClick?: () => void;
}

const AgendaCard: React.FC<Props> = (props) => {
  const { statusColor, time, infoList, onClick } = props;

  return (
    <Wrapper>
      <Card fluid onClick={onClick}>
        <Card.Header>
          <Label attached="top" color={statusColor}>
            <FiClock className="label-icon" />
            <b className="time">{time}</b>
          </Label>
        </Card.Header>
        <Card.Content>
          <ContentWrapper>
            {infoList.map((i) => (
              <InfoRow key={i.name} label={i.label} content={i.content} />
            ))}
          </ContentWrapper>
        </Card.Content>
      </Card>
    </Wrapper>
  );
};

export default AgendaCard;
