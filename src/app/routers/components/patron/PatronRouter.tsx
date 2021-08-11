import MainLibrary from '@app/pages/patron/mainLibrary/MainLibrary'
import MyBooks from '@app/pages/patron/mybook/MyBooks'
import MyHistory from '@app/pages/patron/myhistory/MyHistory'
import MyRequest from '@app/pages/patron/myrequest/MyRequest'
import HelperRoute from '@app/routers/HelperRoute'
import RouterRender from '@app/routers/RouterRender'
import React from 'react'
import { match } from 'react-router-dom'

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
