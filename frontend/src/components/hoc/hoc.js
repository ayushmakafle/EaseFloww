import React from 'react'
import MainNavbar from '../Navbar'

const WithLayout = (Component) => {

  return (
    <>

        <MainNavbar/>
        <Component />
    </>
  )
}

export default WithLayout
