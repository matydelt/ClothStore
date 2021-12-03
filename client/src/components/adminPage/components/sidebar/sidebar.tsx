import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
export const SidebarData = [
    {
        title: 'Home',
        path: '/admin',
        icon: <HomeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Publicaciones',
        path: '/admin/publicaciones',
        icon: <SearchIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Usuarios',
        path: '/admin/usuarios',
        icon: <PersonIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Denuncias',
        path: '/admin/denuncias',
        icon: <ReportProblemIcon />,
        cName: 'nav-text'
    },
];