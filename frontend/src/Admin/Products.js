import React ,{useState,useEffect} from 'react';
import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import { imageFromBuffer } from '../utils/utils';


const Products = () => {
    const [products,setProducts] = useState([])

    //get all products
    const getAllProducts = async()=>{
        try{
            const {data} = await axios.get('/api/v1/product/get-product')
            setProducts(data.products)
        }catch(error){
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //lifecycle methos
    useEffect(() => {
        getAllProducts()
    },[])

  return (
    <>
      <MainNavbar />
      <div>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap justify-content-around">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{ width: "300px", height: "400px", padding: "15px" }}
                  >
                    <img
                      src={imageFromBuffer({type:p.photo.contentType,data:p.photo.data.data})}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: "#FF06BF" }}>
                        {p.name}
                      </h5>
                      <p
                        className="card-text"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          maxHeight: "3em",
                        }}
                      >
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
