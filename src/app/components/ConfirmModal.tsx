import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
import { FiX, FiCheck, FiHelpCircle } from 'react-icons/fi';
import styled from 'styled-components';

import { useSelector, useDispatch } from '@app/hooks';
import { clearConfirmCallback } from '@app/slices/global';

const StyledIconWrapper = styled.span`
  line-height: 0;
  margin-right: 8px;
  font-size: 20px;
  vertical-align: middle;
`;
const Message = styled.p`
  font-size: 30px;
`;

const ConfirmModal: React.FC = () => {
  const { confirmation } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { message, callback } = confirmation ?? {};

  return (
    <Modal basic size="small" open={Boolean(callback) && Boolean(message)}>
      <Header
        content="Xác nhận"
        icon={
          <StyledIconWrapper>
            <FiHelpCircle />
          </StyledIconWrapper>
        }
      />
      <Modal.Content>
        <Message>{message}</Message>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          inverted
          color="red"
          content="Hủy"
          icon={
            <StyledIconWrapper>
              <FiX />
            </StyledIconWrapper>
          }
          onClick={(): void => {
            dispatch(clearConfirmCallback());
          }}
        />
        <Button
          color="green"
          inverted
          content="Xác nhận"
          icon={
            <StyledIconWrapper>
              <FiCheck />
            </StyledIconWrapper>
          }
          onClick={(): void => {
            if (callback) {
              callback();
            }
            dispatch(clearConfirmCallback());
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default React.memo(ConfirmModal);
