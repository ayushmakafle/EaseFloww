import {useState,useEffect,useContext,createContext} from  'react';
import axios from 'axios';

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const[auth,setAuth] = useState({
        user:null,
        token :"",
        doctor:null
    });

    //default axios
    axios.defaults.headers.common['Authorization'] = auth?.token
    useEffect(() => {
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            console.log('parsedata',parseData)
            setAuth({
                ...auth,user:parseData.user,
                doctor:parseData.doctor,
                token:parseData.token
            })
        }
    },[])

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}