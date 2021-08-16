import { NavItem } from '@app/models/side-bar-tab-item'
import DashBoard from '@app/pages/librarian/DashBoard'
import MainLibrary from '@app/pages/patron/mainLibrary/MainLibrary'
import MyBooks from '@app/pages/patron/mybook/MyBooks'
import MyHistory from '@app/pages/patron/myhistory/MyHistory'
import MyRequest from '@app/pages/patron/myrequest/MyRequest'
import HelperRoute from '@app/routers/HelperRoute'
import RouterRender from '@app/routers/RouterRender'
import React from 'react'
import { match } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

export const librarianNavData:NavItem[] = [
    {
        title : "Dash Board",
        Icon  : <Icon name='dashboard' size='large' />,
        path  : "/dashboard"
    },
    {
        title : "User's Request",
        Icon  : <Icon name='check square' size='large' />,
        path  : "/userrequest"
    },
    {
        title : "Book",
        Icon  : <Icon name='book' size='large'/>,
        path  : "/mybook"
    },
    {
        title : "My Request",
        Icon  : <Icon name='tasks' size='large'/>,
        path  : "/myrequest"
    },
    {
        title : "Manage Library",
        Icon  : <Icon name='bars' size='large'/>,
        path  : "/managelibrary",

        subMenu : [
            {
                title : "Authors",
                Icon  : <Icon name='pencil' size='large' />,
                path  : "/manageauthor"
            },
            {
                title : "Categories",
                Icon  : <Icon name='qrcode' size='large' />,
                path  : "/managecategory"
            },
            {
                title : "Publishers",
                Icon  : <Icon name='print' size='large'/>,
                path  : "/managepublisher"
            },
            {
                title : "Locations",
                Icon  : <Icon name='point' size='large'/>,
                path  : "/managelocation"
            },
            {
                title : "Bookshelves",
                Icon  : <Icon name='server' size='large'/>,
                path  : "/managebookshelf"
            },
            {
                title : "Departments",
                Icon  : <Icon name='building' size='large'/>,
                path  : "/managedepartment"
            },
        ]
    }
]
const routes : HelperRoute[] =[
    {
        path : '/',
        exact : true,
        redirectTo: '/dashboard'
    },
    {
        component : DashBoard,
        path : '/dashboard',
    }
]


const LibrarianRouter:React.FC<{match:match}> = (props) => {
    return (
        <RouterRender
        routerPath={props.match?.path}
        helperRoutes={routes}
      />
    )
}

export default LibrarianRouter
