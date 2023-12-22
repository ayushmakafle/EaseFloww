import React, { useState, useEffect } from 'react'
import useCategory from '../hooks/useCategory'
// import MainNavbar from '../components/Navbar'
import EcomHeader from '../components/EcomHeader'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = useCategory()

  return (
    <>
      {/* <MainNavbar /> */}
      <EcomHeader />

      <div className="container">
        <div className="row">
          {categories.map(c => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`}
                className='btn btn-primary'
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories
