import React from 'react'
import UserMenu from './UserMenu'

const Profile = () => {
  return (
    <>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
                <h1>My Profile</h1>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
