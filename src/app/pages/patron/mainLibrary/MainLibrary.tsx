import React, { useEffect, useState } from 'react';
import {
  Container,
  Menu,
  MenuItem,
  Search,
  Segment,
  MenuMenu,
} from 'semantic-ui-react';
import OnTrendingBookList from './OnTrendingBookList';
import NewBookList from './NewBookList';
import { useQuery } from 'react-query';
import './test.css';
import { UserState } from '@app/store/types';
import { shallowEqual, useSelector } from 'react-redux';
import { IBOOK } from '@app/models/book';

const getBook = async (): Promise<IBOOK[]> => {
  return await await (
    await fetch(
      'http://libapi.hisoft.vn/books/getbookpage?currentPage=1&productPerPage=5',
    )
  )
    .json()
    .then((response) => response.data);
};

const MainLibrary: React.FC = () => {
  const [activeName, setActiveName] = useState<string>('On trending');
  const { data, isLoading, error } = useQuery<any>('books', getBook);
  console.log('data', data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something 's wrong !</div>;

  return (
    <Container className="BooksContainier">
      <Menu secondary pointing>
        <MenuMenu>
          <MenuItem
            name="On trending"
            active={activeName === 'On trending'}
            onClick={() => setActiveName('On trending')}
          />
          <MenuItem
            name="New"
            active={activeName === 'New'}
            onClick={() => setActiveName('New')}
          />
        </MenuMenu>
        <Menu.Menu position="right">
          <Search />
        </Menu.Menu>
      </Menu>

      {activeName === 'On trending' ? (
        <OnTrendingBookList booklist={data} />
      ) : (
        <NewBookList />
      )}
    </Container>
  );
};

export default MainLibrary;
