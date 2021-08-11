import React from 'react'
import  {Icon}   from 'semantic-ui-react'
const NavbarData = [
    {
        title : "Library",
        icon  : <Icon name='book' color='red' size='large' />,
        path  : "/mainlibrary",
    },
    {
        title : "My Request",
        icon  : <Icon name='tasks' color='red' size='large' />,
        path  : "/myrequest",
    },
    {
        title : "My Books",
        icon  : <Icon name='suitcase' color='red' size='large'/>,
        path  : "/mybook",
    },
    {
        title : "History",
        icon  : <Icon name='history' color='red' size='large'/>,
        path  : "/history",
    },
]
export default NavbarData