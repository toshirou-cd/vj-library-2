import React, { PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';
import { Dropdown, Button, SemanticCOLORS, Popup } from 'semantic-ui-react';

const StyledIconButtonWrapper = styled.span`
  margin-left: 4px !important;
`;

const IconButton = styled(Button)`
  padding: 8px !important;
  line-height: 0 !important;
  margin-right: 0 !important;
`;

const IconWrapper = styled.div`
  svg {
    margin-right: 4px;
    vertical-align: bottom;
  }
`;

export interface DropdownActions<T> {
  icon: JSX.Element;
  color?: SemanticCOLORS;
  titleDropdown: string;
  onDropdownClick: (data: T) => void;
  dropdownHidden?: boolean;
  dropdownDisabled?: boolean;
}

export interface RowAction<T> {
  icon: JSX.Element;
  color?: SemanticCOLORS;
  title: string;
  onClick?: (data: T) => void;
  hidden?: boolean | ((data: T) => boolean);
  disabled?: boolean | ((data: T) => boolean);
  dropdown?: boolean | ((data: T) => boolean);
  dropdownActions?: DropdownActions<T>[];
}

export interface TableAction<T> {
  icon: JSX.Element;
  color?: SemanticCOLORS;
  title: string;
  onClick?: (data: T[]) => void;
  hidden?: boolean | ((data: T[]) => boolean);
  disabled?: boolean | ((data: T[]) => boolean);
  dropdown?: boolean | ((data: T[]) => boolean);
  dropdownActions?: DropdownActions<T[]>[];
}

interface Props<T extends object> extends RowAction<T> {
  data: T;
}

const Action: <T extends object>(
  props: PropsWithChildren<Props<T>>,
) => JSX.Element = (props) => {
  const {
    icon,
    color = 'black',
    title,
    onClick,
    disabled: disabledProp = false,
    hidden: hiddenProp = false,
    dropdown: dropdownProp = false,
    dropdownActions = [],
    data,
  } = props;

  const disabled = useMemo(() => {
    if (typeof disabledProp === 'function') {
      return disabledProp(data);
    }
    return disabledProp;
  }, [data, disabledProp]);

  const hidden = useMemo(() => {
    if (typeof hiddenProp === 'function') {
      return hiddenProp(data);
    }
    return hiddenProp;
  }, [data, hiddenProp]);

  const dropdown = useMemo(() => {
    if (typeof dropdownProp === 'function') {
      return dropdownProp(data);
    }
    return dropdownProp;
  }, [data, dropdownProp]);

  return (
    <>
      {!hidden && (
        <Popup
          pinned
          inverted
          size="tiny"
          content={title}
          position="bottom center"
          trigger={
            !dropdown ? (
              <StyledIconButtonWrapper>
                <IconButton
                  basic
                  icon={icon}
                  color={color}
                  disabled={disabled}
                  onClick={(e: React.MouseEvent): void => {
                    e.stopPropagation();
                    if (typeof onClick === 'function') {
                      onClick(data);
                    }
                  }}
                />
              </StyledIconButtonWrapper>
            ) : (
              <Button.Group basic color={color} style={{ border: 'none' }}>
                <Dropdown
                  button
                  icon={icon}
                  className="icon"
                  disabled={disabled}
                  style={{ padding: '8px 7px 6px 7px', marginLeft: '4px' }}
                >
                  <Dropdown.Menu>
                    {dropdownActions
                      .filter((o) => !o.dropdownHidden)
                      .map((o) => (
                        <Dropdown.Item
                          key={o.titleDropdown}
                          disabled={o.dropdownDisabled}
                          onClick={(e: React.MouseEvent): void => {
                            e.stopPropagation();
                            o.onDropdownClick(data);
                          }}
                        >
                          <IconWrapper>
                            <span style={{ color: o.color }}>{o.icon}</span>
                            {o.titleDropdown}
                          </IconWrapper>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Button.Group>
            )
          }
        />
      )}
    </>
  );
};

export default Action;
