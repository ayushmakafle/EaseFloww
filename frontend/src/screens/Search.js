import React from 'react'
// import MainNavbar from '../components/Navbar'
import EcomHeader from '../components/EcomHeader'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const[values,setValues]=useSearch()
    const navigate = useNavigate()
  return (
    <>
      {/* <MainNavbar /> */}
      <EcomHeader />
      <div className="container">
        <div className="text-center">
            <h1 style={{fontFamily: 'Poppins', color: '#FF06BF'}}>Search Results</h1>
            <h6 style={{color: '#de5d83', fontFamily: 'sans-serif'}}>{values?.results.length<1?'No products found' : `Found:${values.results.length}`}</h6>
            <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: '300px', height: '450px', padding: '15px' }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#FF06BF' }}>
                    {p.name.substring(0, 40)}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text" style={{fontWeight:'bolder',color:"#FF06BF"}}>
                    NRs.{p.price}/-
                  </p>
                  
                  <button className='btn btn-primary ms-1' style={{backgroundColor:'#FF06BF'}}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
      
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
