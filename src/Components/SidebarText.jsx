import React from 'react';
import * as vscIcons from "react-icons/vsc";
import * as aiIcons from "react-icons/ai";
import * as fcIcons from "react-icons/fc";
import * as giIcons from "react-icons/gi";
import * as faIcons from "react-icons/fa";


export const SidebarText = [
    {
        title: 'home',
        Path: '/',
        icon: <aiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Donate',
        Path: '/donate',
        icon: <giIcons.GiTakeMyMoney />,
        cName: 'nav-text'
    },
    {
        title: 'Volunteer',
        Path: '/volun',
        icon: <faIcons.FaPeopleCarry />,
        cName: 'nav-text'
    },
    {
        title: 'My Profile',
        Path: '/profile',
        icon: <fcIcons.FcManager />,
        cName: 'nav-text'
    },
]