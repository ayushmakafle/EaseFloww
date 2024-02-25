import React ,{useState,useEffect} from 'react'
import axios from 'axios'
// import MainNavbar from '../components/Navbar'
import EcomHeader from '../components/EcomHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cart';
import { toast } from 'react-toastify'
const CategoryProduct = () => {
  const [cart, setCart] = useCart()
    const navigate= useNavigate()
    const params = useParams()

    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])
    const [loading, setLoading] = useState(false)
      const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)



    useEffect(() => {
        if(params?.slug) getProductsByCat()
    },[params?.slug])

    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])

    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products])
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getProductsByCat = async() => {
        try{
            const {data} = await axios.get(
                `/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <>
        {/* <MainNavbar /> */}
        <EcomHeader />
        <h3 style={{fontFamily: 'Poppins', color: '#FF06BF', textAlign:'center', marginTop:'10px'}}>
          Category - {category?.name}</h3>
        <h6 className='text-center' style={{color:'#de5d83', fontWeight:'bold'}}>{products?.length} products found</h6>

        <div className="row">
    <div className="col-md-9 offset-1">
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: '450px', height: '450px', padding: '15px' }}>
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
                  <p className="card-text">
                    NRs.{p.price}/-
                  </p>
                  <button 
                    className='btn btn-primary ms-1'
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{backgroundColor:'#d90166'}}
                  >More Details</button>
               {/*  <button className='btn btn-secondary' onClick={() => { setCart([...cart, p]); toast.success('Item added to cart'); }}>
                <i className="fas fa-cart-shopping"></i>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}>
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
    </div>
      
    </>
  )
}

export default CategoryProduct
