import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';

import { useSelector, useDispatch, useAuth } from '@app/hooks';
import { openComponentTab } from '@app/slices/global';
import { getGroup, getComponent } from '@app/utils/component-tree';

const StyledDropdown = styled(Dropdown)`
  border-top: ${(props): string =>
    props.active === 'true' ? '2px solid' : 'none'};
  > .text {
    font-weight: ${(props): number => (props.active === 'true' ? 600 : 400)};
  }
`;

interface Props {
  groupKey: string;
  childrenList: Array<{
    key: string;
    permissionCode?: string;
  }>;
}

const MenuButton: React.FC<Props> = (props) => {
  const { groupKey, childrenList } = props;

  const { tabList } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { hasPermission } = useAuth();
  const selectedGroup = getGroup(groupKey);

  return (
    <StyledDropdown
      className="link item"
      active={`${tabList.some((e) => e.selected && e.groupKey === groupKey)}`}
      text={selectedGroup?.title}
    >
      <Dropdown.Menu>
        {childrenList.map((ck) => {
          const c = getComponent(groupKey, ck.key);
          const hp =
            !ck.permissionCode ||
            (ck.permissionCode && hasPermission(ck.permissionCode));
          if (c && hp)
            return (
              <Dropdown.Item
                key={c.key}
                content={c.title}
                onClick={(): void => {
                  dispatch(
                    openComponentTab({
                      groupKey,
                      key: c.key,
                    }),
                  );
                }}
              />
            );
          return null;
        })}
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default MenuButton;
