import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='layoutContainer'>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout