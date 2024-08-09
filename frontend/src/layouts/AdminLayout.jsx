import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/layout/AdminNavbar'

const AdminLayout = () => {
    const [navToggle, setNavToggle] = useState(true)

    return (
        <div className='flex flex-col w-screen h-screen bg-slate-300 font-ubuntu'>
            <AdminNavbar toggle={navToggle} onToggleNav={() => setNavToggle(prev => !prev)} />
            <div className={`transition-none main text-sm fixed top-[75px] p-4 overflow-auto w-full h-[calc(100vh-75px)] ${navToggle ? 'lg:w-[calc(100vw-250px)] lg:left-[250px]' : ''}`} >
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout