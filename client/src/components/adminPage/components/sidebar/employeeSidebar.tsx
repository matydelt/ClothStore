import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Publicaciones',
        path: '/employee/publicaciones',
        icon: <SearchIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Denuncias',
        path: '/employee/denuncias',
        icon: <ReportProblemIcon />,
        cName: 'nav-text'
    },
];