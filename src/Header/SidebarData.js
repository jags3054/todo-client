import React from 'react'
import { CgCalendarDates, CgCalendarTwo } from 'react-icons/cg'


export const SidebarData = [
    {
        title: 'Today',
        path: '/',
        icon: <CgCalendarTwo />,
        cName: "nav-text"
    },
    {
        title: 'Upcoming',
        path: '/Upcoming',
        icon: <CgCalendarDates />,
        cName: "nav-text"
    }

]


