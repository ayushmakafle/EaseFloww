import React, { useEffect, useState } from 'react'
import DoctorNavbar from './DoctorNavbar'
import { Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import {toast} from 'react-toastify'

const DoctorAppointments = () => {

    const [appointments,setAppointments] = useState([])
    
    const getAppointments = async() => {
        try{
            const res = await axios.get('/api/v1/appointment/doctor-appointment')
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

    const handleStatus = async(record,status) =>{
        try{
            const res = await axios.post('/api/v1/appointment/update-status',{
                appointmentsId:record._id,
                status
            })
            if(res.data.success){
                toast.success(res.data.message)
                getAppointments()
            }
        }catch(error){
            console.log(error)
            toast.error('Something went wrong')
        }
    }

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
        },
        {
            title: 'Actions',
            key: 'actions', // Add a unique key for the Actions column
            dataIndex: 'actions', // Use a dataIndex key for Ant Design to identify the column
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' && (
                        <div className='d-flex'>
                            <button
                                className='btn btn-primary m-2'
                                onClick={() => handleStatus(record, 'approved')}
                            >
                                Approve
                            </button>
                            <button
                                className='btn btn-dark m-2'
                                onClick={() => handleStatus(record, 'reject')}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ),
        }
    ]

  return (
    <>
    <DoctorNavbar />
        <h1>All Appointments</h1>
        <Table columns ={columns} dataSource={appointments} className='m-2'/>
              
    </>
  )
}

export default DoctorAppointments
