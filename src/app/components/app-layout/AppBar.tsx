import React from 'react';
import { Menu, Loader, Dimmer } from 'semantic-ui-react';
import styled from 'styled-components';

import componentTree, { getGroup } from '@app/utils/component-tree';

import { useSelector, useDispatch, useAuth } from '@app/hooks';
import { openComponentTab } from '@app/slices/global';

import MenuButton from './MenuButton';
import UserProfileButton from './UserProfileButton';

import packageJson from '../../../../package.json';
import logo from '../../assets/img/logo.png';

const Wrapper = styled.div`
  padding: 8px;
`;

const AppBar: React.FC = () => {
  const { getUserInfoLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { hasPermission } = useAuth();

  return (
    <Wrapper>
      <Menu>
        <Menu.Item>
          <img alt={`v${packageJson.version}`} src={logo} height={40} />
          <Dimmer active={getUserInfoLoading} inverted>
            <Loader />
          </Dimmer>
        </Menu.Item>
        {componentTree.map((item) => {
          if (item.permissionCode && !hasPermission(item.permissionCode))
            return null;

          const tmp = getGroup(item.key);
          if (!tmp) return null;
          if (item.childrenList) {
            return (
              <MenuButton
                key={item.key}
                groupKey={tmp.key ?? ''}
                childrenList={item.childrenList.map((c) => ({
                  key: c.key,
                  permissionCode: c.permissionCode,
                }))}
              />
            );
          }
          return (
            <Menu.Item
              key={tmp?.key}
              content={tmp?.title}
              onClick={(): void => {
                dispatch(
                  openComponentTab({
                    groupKey: item.key,
                    key: item.key,
                  }),
                );
              }}
            />
          );
        })}

        <Menu.Menu position="right">
          <UserProfileButton />
        </Menu.Menu>
      </Menu>
    </Wrapper>
  );
};

export default AppBar;
