import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'

const Spinner = ({path='login'}) => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation() //to redirect after login back to original page

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        },1000);
        count === 0 && navigate(`/${path}`,{
            state:location.pathname
        })
        return () => clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <>
     <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        backgroundColor: 'pink',
        color: 'white',
        fontSize: '1.5rem',
      }}
    >
      <div className="text-center">
        <h1>Redirecting you in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    </>
  )
}

export default Spinner
