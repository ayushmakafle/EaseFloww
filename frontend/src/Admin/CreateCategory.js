import React,{useEffect,useState} from 'react'
//import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../components/Form/CategoryForm'
import {Modal} from 'antd'

const CreateCategory = () => {

  const [categories,setCategories] = useState([])
  const [name,setName]= useState("")
  const [visible, setVisible] = useState(false);//for pop up modal
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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
        setCategories(data?.category); //optional chaining to prevent error messeasges while loading
      }

    }catch(error){
      console.log(error)
      toast.error('something went wrong while getting categories')
    }
  }

  useEffect(() => {
    getAllCategory()
  },[])

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`category is deleted`);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
     <>
    {/* <MainNavbar /> */}

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
                        <button className='btn btn-dark ms-2' style={{ background: '#FF5FA3'}}
                          onClick={() => {setVisible(true) ;
                          setUpdatedName(c.name);
                          setSelected(c)}}>
                          Edit</button>
                        <button className='btn btn-dark ms-2' style={{ background: '#FF06BF ' }}
                          onClick={() => {handleDelete(c._id)}}>
                          Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
              <CategoryForm 
                value={updatedName} 
                setValue={setUpdatedName} 
                handleSubmit={handleUpdate}/>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory
