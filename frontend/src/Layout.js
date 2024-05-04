import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from './components/HeaderAdmin'
import HeaderUser from './components/HeaderUser'

const Layout = () => {
          const [role, setrole]=useState(true);

          if(localStorage.getItem("role")=="admin"){
            setrole(false)
          }
  return (
    <>
    {role?<HeaderUser/>:<HeaderAdmin/>}
    <Outlet/>
    </>
  )
}

export default Layout