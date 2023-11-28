import React,{useEffect,useState} from 'react'
import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'

const CreateCategory = () => {

  const [categories,setCategories] = useState([])

  //get all categories
  const getAllCategory = async()=>{
    try{
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data.success){
        setCategories(data.category);
      }

    }catch(error){
      console.log(error)
      toast.error('something went wrong while getting categories')
    }
  }

  useEffect(() => {
    getAllCategory()
  },[])


  return (
     <>
    <MainNavbar />

     <div className='container-fluid m-3 p-3'>

    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1>Manage Categories</h1>
            <div className='w-75'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <>
                  <tr>
                    <td key={c._id}>{c.name}</td>                
                    <td><button className='btn btn-primary'>Edit</button></td>
                </tr>
                </>
                ))}    
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CreateCategory
