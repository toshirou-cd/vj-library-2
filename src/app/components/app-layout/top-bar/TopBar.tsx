import { logout } from '@app/store/actions/authActions'
import React, { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {Icon, Menu, Dropdown} from 'semantic-ui-react'
import './TopBar.css'
// import { logout } from '../../redux/actions/authActions'



const TopBar = () => {
    const dispatch : Dispatch<any> = useDispatch()

    return (
        <div className="TopBar">
            <Menu size='tiny' >
            <Menu.Menu position='right'>
                <Dropdown item text='AnhNH'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Change role</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(logout())} as={Link} to="/login">
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
            <Menu.Item>
                <Icon link name='bell'></Icon>
            </Menu.Item>
        </Menu>
        </div>
    )
}

export default TopBar
