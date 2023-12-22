import React, { useEffect, useState } from 'react'
//import MainNavbar from '../components/Navbar'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd';

const Appointments = () => {

    const [appointments,setAppointments] = useState([])
    
    const getAppointments = async() => {
        try{
            const res = await axios.get('/api/v1/appointment/user-appointments')
            if(res.data.success){
                setAppointments(res.data.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    },[])

    const columns = [
        {
            title:'ID',
            dataIndex:'_id'
        },
     /*    {
            title:'Name',
            dataIndex:'name',
            render:(text,record) => (
                <span>
                    {record.doctorID.name} 
                </span>
            )
        },
        {
            title:'Phone',
            dataIndex:'phone',
            render:(text,record)=>(
                <span>
                    {record.doctorID.phonenumber}
                </span>
            )
        }, */
        {
            title:'Date & Time',
            dataIndex:'date',
            render:(text,record)=>(
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title:'Status',
            dataIndex:'status'
        }
    ]

  return (
    <>
      {/* <MainNavbar /> */}
       <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>All Appointments</h1>
            <Table columns ={columns} dataSource={appointments} className='m-2'/>
          </div>
         </div>
        </div>
    </>
  )
}

export default Appointments
