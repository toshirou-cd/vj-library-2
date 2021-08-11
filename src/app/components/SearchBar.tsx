import React, { ReactElement, useState, useEffect } from 'react';
import { Accordion, Input } from 'semantic-ui-react';
import { FiMenu } from 'react-icons/fi';
import styled from 'styled-components';

const StyledAccordion = styled(Accordion)`
  box-shadow: none !important;
  .title {
    padding: 0 !important;
  }
  .content {
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-top: none;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    padding: 8px !important;
    background: white;
  }
  width: 30% !important;

  
`;

interface Props {
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  onChange?: (searchValue: string) => void;
  children?: ReactElement;
  childrenProps?: {
    [propName: string]: any;
  };
}

const SearchBar: React.FC<Props> = (props) => {
  const {
    size = 'mini',
    onChange = (): void => {},
    children,
    childrenProps,
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(searchValue);
    }, [300]);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [searchValue, onChange]);

  return (
    <StyledAccordion fluid>
      <Accordion.Title active={expanded}>
        <Input
          fluid
          size={size}
          icon="search"
          placeholder="Search"
          onChange={(e, { value }): void => {
            setSearchValue(value.trim().toLowerCase());
          }}
          label={
            children
              ? {
                  basic: true,
                  content: <FiMenu />,
                  onClick: (): void => setExpanded((e) => !e),
                }
              : null
          }
        />
      </Accordion.Title>
      <Accordion.Content>
        {children ? React.cloneElement(children, childrenProps) : ''}
      </Accordion.Content>
    </StyledAccordion>
  );
};

export default SearchBar;
