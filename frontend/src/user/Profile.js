import React,{useState,useEffect} from 'react'
import UserMenu from './UserMenu'
import MainNavbar from '../components/Navbar'
import { useAuth } from "../context/auth";
import {toast} from 'react-toastify'
import axios from 'axios';

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, username, phonenumber, address } = auth?.user;
    setName(username);
    setPhone(phonenumber);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

   // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        username,
        email,
        password,
        phonenumber,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    <MainNavbar />
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
                <h1>My Profile</h1>
            </div>
            <div className="col-md-9">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="username"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="phone"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="address"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Profile
