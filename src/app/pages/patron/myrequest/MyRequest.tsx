import { render } from '@testing-library/react'
import React, { useState } from 'react'
import { Container, Menu,MenuItem, Search, Tab, Table, TabPane,Segment, TableHeader, Input, MenuMenu } from 'semantic-ui-react'
import BorrowRequestList from './BorrowRequestList'
import ExtandRequestList from './ExtandRequestList'
import '../mainLibrary/test.css'

const panes = [
    {
      menuItem: 'Borrow Request',
      render: () => <BorrowRequestList/>,
    },
    {
      menuItem: 'Extend Request',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    }
  ]
  

const MyRequest:React.FC = () => {

    const [activeName, setActiveName] = useState<string>('Borrow Request')
    return (
        <Container className="RequestContainer">
            <Menu secondary pointing >
                <MenuMenu>
                    <MenuItem  name='Borrow Request'
                               active={activeName === 'Borrow Request'}
                               onClick={()=> setActiveName("Borrow Request")} />
                    <MenuItem  name='Extend Request'
                                 active={activeName === 'Extend Request'}
                                 onClick={() => setActiveName("Extend Request")}/>
                    
                </MenuMenu>
                <Menu.Menu position='right'>
                    <Search />
                </Menu.Menu>
            </Menu>
            <Segment>
                {activeName === "Borrow Request" ? <BorrowRequestList/>: <ExtandRequestList/>}
            </Segment>
        </Container>
      
        
    )
}

export default MyRequest
