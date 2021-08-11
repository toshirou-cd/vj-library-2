import React, { useState } from 'react';
import { Container, Menu,MenuItem, Search ,Segment, MenuMenu } from 'semantic-ui-react';
import BorrowingBookList from "./BorrowingBookList";
import ExpiredBookList from './ExpiredBookList';

const panes = [
    {
      menuItem: 'Borrowing',
      render: () => <BorrowingBookList/>,
    },
    {
      menuItem: 'Expired',
      render: () => <ExpiredBookList/>,
    }
  ]

const MyBooks:React.FC= () => {
    const [activeName, setActiveName] = useState<string>('Borrowing')
    return (
        <Container className="BooksContainier">
            <Menu secondary pointing >
                <MenuMenu>
                    <MenuItem  name='Borrowing'
                               active={activeName === 'Borrowing'}
                               onClick={()=> setActiveName("Borrowing")} />
                    <MenuItem  name='Expired'
                                 active={activeName === 'Expired'}
                                 onClick={() => setActiveName("Expired")}/>
                    
                </MenuMenu>
                <Menu.Menu position='right'>
                    <Search />
                </Menu.Menu>
            </Menu>
            <Segment>
                {activeName === "Borrowing" ? <BorrowingBookList/>: <ExpiredBookList/>}
            </Segment>
        </Container>
    )
}

export default MyBooks
