import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'

const Spinner = () => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation() //to redirect after login back to original page

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        },1000);
        count === 0 && navigate('/login',{
            state:location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location])
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h1 className='text-center'>redirecting you in {count} seconds</h1>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>

    </>
  )
}

export default Spinner
