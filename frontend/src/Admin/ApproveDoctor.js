import React, { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
//import MainNavbar from '../components/Navbar';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import { imageFromBuffer } from "../utils/utils"
import { ExclamationCircleOutlined } from '@ant-design/icons';


const ApproveDoctors = () => {
  const [unapprovedDoctors, setUnapprovedDoctors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedImage,setSelectedImage]=useState("");

   // State to manage the approve confirmation modal
  const [approveModalVisible, setApproveModalVisible] = useState(false);

  // Function to handle the approve confirmation
  const showApproveConfirm = (doctor) => {
    Modal.confirm({
      title: 'Confirm Approve',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to approve this doctor?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => handleApproveDoctor(doctor),
    });
  };

  // State to manage the deny confirmation modal
  const [denyModalVisible, setDenyModalVisible] = useState(false);

  // Function to handle the deny confirmation
  const showDenyConfirm = (doctor) => {
    Modal.confirm({
      title: 'Confirm Deny',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to deny this doctor?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => handleDenyDoctor(doctor),
    });
  };

  useEffect(() => {
  // Fetch unapproved doctors from the server
  fetchUnapprovedDoctors();
}, []);




useEffect(() => {
  console.log('Unapproved Doctors:', unapprovedDoctors);
}, [unapprovedDoctors]);


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hospital or Clinic',
      dataIndex: 'hospitalOrClinic',
      key: 'hospitalOrClinic',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Certificate',
      dataIndex: 'certificatePhoto',
      key: 'certificatePhoto',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewCertificate(record)}>
          View Certificate
        </Button>
      ),
    },
   {
    title: 'Experience',
    dataIndex: 'experience',
    key: 'experience',
  },
   {
    title: 'Office Days',
    dataIndex: 'officeDays',
    key: 'officeDays',
    render: (text, record) => (
      <span>
        {JSON.parse(record.officeDays).map(day => day.label).join(', ')}
      </span>
    ),
  },
  {
    title: 'Office Hours',
    dataIndex: 'officeHours',
    key: 'officeHours',
    render: (text, record) => (
      <span>{`${record.officeHoursStart} - ${record.officeHoursEnd}`}</span>
    ),
  },
  {
    title: 'Fees Per Consultation',
    dataIndex: 'feesPerConsultation',
    key: 'feesPerConsultation',
  },
  {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => showApproveConfirm(record)}>
            Approve
          </Button>
          <Button type="danger" onClick={() => showDenyConfirm(record)}>
            Deny
          </Button>
        </>
      ),
    },
  ];

const handleViewCertificate = async (doctor) => {
  // try {
  setSelectedImage(doctor.certificatePhoto)
    setVisible(true);
  // Fetch the certificate photo using the doctor's ID
  // const response = await axios.get(`/api/v1/auth/unapproved-photo/${doctor._id}`, {
  //   responseType: 'arraybuffer',
  // });

  // console.log('Response:', response); // Log the entire response object

  // if (response.status === 200) {
  //   // Convert the image data to a base64 string using Uint8Array
  //   const imageData = btoa(
  //     new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   );

  //   // Show the modal and update the state of selectedDoctor with the certificate photo data
  //   setVisible(true);
  //   setSelectedDoctor({
  //     ...doctor,
  //     certificatePhoto: {
  //       ...doctor.certificatePhoto,
  //       data: imageData,
  //     },
  //   });
  // }
  // } catch (error) {
  //   console.error('Error fetching certificate photo:', error.message);
  // }
};

  const handleApproveDoctor = async (doctor) => {
    try {
      // Make API call to update isApproved to true
      await axios.put(`/api/v1/auth/approve-doctor/${doctor._id}`);
      // Refresh the list of unapproved doctors
      fetchUnapprovedDoctors();
    } catch (error) {
      console.error('Error approving doctor:', error.message);
    }
  };

  const handleDenyDoctor = async (doctor) => {
    const confirmDeny = window.confirm('Are you sure you want to deny this doctor?');

    if (confirmDeny) {
      try {
        // Make API call to delete the doctor
        await axios.delete(`/api/v1/auth/deny-doctor/${doctor._id}`);
        // Refresh the list of unapproved doctors
        fetchUnapprovedDoctors();
      } catch (error) {
        console.error('Error denying doctor:', error.message);
      }
    }
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const fetchUnapprovedDoctors = async () => {
    try {
      const response = await axios.get('/api/v1/auth/unapproved-doctors');
      if (response.data.success) {
        setUnapprovedDoctors(response.data.doctors);
      } else {
        console.error('Error fetching unapproved doctors:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching unapproved doctors:', error.message);
    }
  };

  useEffect(() => {
    // Fetch unapproved doctors from the server
    fetchUnapprovedDoctors();
  }, []); // Run this effect only once on component mount

  console.log('Unapproved Doctors:', unapprovedDoctors);

  return (
    <>
      {/* <MainNavbar /> */}

      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{color:'#ef5e99',margin:'20px'}}>Approve EaseFlow Doctor Requests</h1>
            <div style={{ overflowX: "auto" }}>
              <Table dataSource={unapprovedDoctors} columns={columns} />
            </div>

            <Modal
              title="Certificate"
              open={visible}
              onCancel={handleModalCancel}
              footer={null}
            >
              {selectedImage && (
                <img
                  src={imageFromBuffer({
                    type: selectedImage?.contentType,
                    data: selectedImage?.data?.data,
                  })}
                  alt="Certificate"
                  height="400px"
                  width="400px"
                />
              )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
};

export default ApproveDoctors;