import React, { useMemo } from 'react';
import { Dropdown, Popup } from 'semantic-ui-react';
import { FiLogOut, FiUser, FiInfo } from 'react-icons/fi';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import { useAuth, useSelector } from '@app/hooks';

import packageJson from '../../../../package.json';

const IconWrapper = styled.span`
  margin-right: 8px;
  vertical-align: middle;
`;
const icon = (i: React.ReactNode): React.ReactNode => (
  <IconWrapper>{i}</IconWrapper>
);

const UserProfileButton: React.FC = () => {
  const {
    token,
    loginLoading,
    getUserInfoLoading,
    getPermissionsOfUserLoading,
  } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const history = useHistory();

  const fullName = token?.username ?? 'Loading...';

  return (
    <Popup
      pinned
      inverted
      size="mini"
      position="bottom right"
      content={fullName}
      trigger={
        <Dropdown
          className="link item"
          icon={<FiUser style={{ marginLeft: 8 }} />}
          text={`${fullName.substring(0, 10)}...`}
          loading={
            loginLoading || getUserInfoLoading || getPermissionsOfUserLoading
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(): void => {
                logout();
                setTimeout(() => {
                  history.push('/');
                  window.location.reload();
                }, 0);
              }}
              content="Đăng xuất"
              icon={icon(<FiLogOut />)}
            />
            <Dropdown.Divider />
            <Dropdown.Item
              disabled
              content={packageJson.version}
              icon={icon(<FiInfo />)}
            />
          </Dropdown.Menu>
        </Dropdown>
      }
    />
  );
};

export default React.memo(UserProfileButton);
