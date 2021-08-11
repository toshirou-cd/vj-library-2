import React from 'react';
import { Popup } from 'semantic-ui-react';

import styled from 'styled-components';

const Wrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  cursor: pointer;
`;

interface Props {
  content: string;
}

const PopupText: React.FC<Props> = (props) => {
  const { content } = props;

  return (
    <Popup
      inverted
      position="top left"
      content={content}
      trigger={<Wrapper>{content}</Wrapper>}
    />
  );
};

export default React.memo(PopupText);
