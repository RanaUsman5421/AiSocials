import React from 'react'
import Sidebar from '../components/Sidebar';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen" >
            <Sidebar />


            <div className="flex flex-col flex-1 md:ml-[var(--sidebar-width)]">

                    <Navbar />

                    <main className="flex-1 pt-[var(--topbar-height)] p-6 bg-gray-100">

                        <Outlet />

                    </main>


                </div>

        </div>
    )
}

export default DashboardLayout
