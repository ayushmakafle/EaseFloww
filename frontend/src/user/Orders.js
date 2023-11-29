import React from 'react'
import UserMenu from './UserMenu'

const Orders = () => {
  return (
    <>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
                <h1>My Orders</h1>
            </div>
        </div>
      </div>
    </>
  )
}

export default Orders
