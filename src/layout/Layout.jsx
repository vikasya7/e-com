import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div>

        {/* always visible */}
        <Navbar/>
        
        {/* page content changes here */}

        <main className='flex-1'>
            <Outlet />
        </main>

        <Footer />
    </div>
  )
}

export default Layout