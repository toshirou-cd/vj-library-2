import React from 'react';
import styled from 'styled-components';
import PopupText from './PopupText';

const Label = styled.p`
  font-size: 13px;
  margin-bottom: 6px;
`;
const Content = styled.p`
  & span {
    font-size: 16px;
    font-weight: bold;
  }
  margin-top: -6px !important;
  margin-bottom: 0 !important;
`;

interface Props {
  label: string;
  content: string;
}

const InfoRow: React.FC<Props> = (props) => {
  const { label, content } = props;
  return (
    <>
      <Label>{`${label}:`}</Label>
      <Content>
        <PopupText content={content || '...'} />
      </Content>
    </>
  );
};

export default React.memo(InfoRow);
