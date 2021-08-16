import { NavItem } from '@app/models/side-bar-tab-item'
import MainLibrary from '@app/pages/patron/mainLibrary/MainLibrary'
import MyBooks from '@app/pages/patron/mybook/MyBooks'
import MyHistory from '@app/pages/patron/myhistory/MyHistory'
import MyRequest from '@app/pages/patron/myrequest/MyRequest'
import HelperRoute from '@app/routers/HelperRoute'
import RouterRender from '@app/routers/RouterRender'
import React from 'react'
import { match } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

export const patronNavData : NavItem[] = [
    {
        title : "Library",
        Icon  : <Icon name='book' color='red' size='large' />,
        path  : "/mainlibrary",
    },
    {
        title : "My Request",
        Icon  : <Icon name='tasks' color='red' size='large' />,
        path  : "/myrequest",
    },
    {
        title : "My Books",
        Icon  : <Icon name='suitcase' color='red' size='large'/>,
        path  : "/mybook",
    },
    {
        title : "History",
        Icon  : <Icon name='history' color='red' size='large'/>,
        path  : "/history",
    },
]
const routes : HelperRoute[] =[
    {
        path : '/',
        exact : true,
        redirectTo: '/mainlibrary'
    },
    {
        component : MainLibrary,
        path : '/mainlibrary',
    },
    {
        component : MyRequest,
        path : '/myrequest',
    },
    {
        component : MyBooks,
        path : '/mybook',
    },
    {
        component : MyHistory,
        path : '/history',
    },
]


const PatronRouter:React.FC<{match:match}> = (props) => {
    return (
        <RouterRender
        routerPath={props.match?.path}
        helperRoutes={routes}
      />
    )
}

export default PatronRouter
