import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='border-bottom border-light-emphasis shadow-md'>
        {/* Topbar  */}
    <Topbar />

    {/* navbar  */}

    <Navbar /> 
    </header>
  )
}

export default Header