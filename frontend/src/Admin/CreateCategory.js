import React,{useEffect,useState} from 'react'
import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../components/Form/CategoryForm'

const CreateCategory = () => {

  const [categories,setCategories] = useState([])
  const [name,setName]= useState("")

  //handle form
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.post('/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
      } else {
        toast.error(data.message)
      }    
    }catch(error){
      console.log(error)
      toast.error('something went wrong while creating new category')
    }
  }

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
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className="table" style={{ border: '1px solid #ccc', background: '#ffe6e6' }}>
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: 'center', color:'#FF0093' }}>S.No.</th>
                    <th scope="col" style={{ textAlign: 'left',  color:'#FF0093' }}>Name</th>
                    <th scope="col" style={{ textAlign: 'left', color:'#FF0093' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c, index) => (
                    <tr key={c._id}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'left' }}>{c.name}</td>
                      <td>
                        <button className='btn btn-dark ms-2' style={{ background: '#FF5FA3' }}>Edit</button>
                        <button className='btn btn-dark ms-2' style={{ background: '#FF06BF ' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory
