import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegEdit } from "react-icons/fa";
import EditModal from '../../admin/adminadd/page';
// import ClipLoader from 'react-spinners/ClipLoader'; 

const AdminProfile = ({ adminId }) => {
  const [adminData, setAdminData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/adminapp/admin/${adminId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
      const data = await response.json();
      setAdminData(data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedAdmin) => {
    setLoading(true);
    try {
      setAdminData(updatedAdmin);
      console.log(updatedAdmin);
      window.location.reload();
    } catch (error) {
      console.error('Error saving admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [adminId]);

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        {/* <ClipLoader color={"#4A90E2"} loading={loading} size={150} /> */}
      </div>
    );
  }

  if (!adminData) {
    return null;
  }

  console.log(adminData);
  return (
    <div className='flex justify-end relative'>
      <div className='bg-slate-50 p-3 border shadow-lg rounded'>
        <div className='bg-purple-600 p-5 rounded-lg w-96 flex items-center justify-center'>
          <div className='absolute top-6 right-6 flex justify-center items-center'>
            <button
              onClick={handleEditClick}
              className='bg-green-500 rounded-full p-2 shadow-purple-900'
            >
              <FaRegEdit size={20} color='#b91c1c' />
            </button>
            {showEditModal && (
              <EditModal
                adminDetails={adminData}
                onSave={handleSave}
                onClose={closeEditModal}
              />
            )}
          </div>
          <div className='flex flex-col items-center '>
            <div className='bg-white w-32 h-32 rounded-full flex items-center justify-center'
              onClick={handleImageClick}>
              {adminData ? (
                <Image
                  src={adminData.adminProfile}
                  alt="Admin Profile"
                  className='rounded-full'
                  width={128}
                  height={128}
                />
              ) : (
                <div className='flex items-center justify-center w-full h-full'>
                  {/* <ClipLoader size={20} color={"#4A90E2"} /> */}
                </div>
              )}
            </div>
            <div className='mt-5'>
              <h1 className='font-semibold text-white text-xl'>{adminData ? adminData.adminName : ''}</h1>
            </div>
            <div className='mt-5 flex justify-between items-center space-x-4 w-full'>
              <div className='justify-center'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Admin ID</h1>
                <p className='text-left text-sm text-gray-300'>{adminData ? adminData.adminID : ''}</p>
              </div>
              <div className='justify-center'>
                <h1 className='font-semibold text-md text-center text-slate-200'>College Code</h1>
                <p className='text-right text-sm text-gray-300'>{adminData.collegeId}</p>
              </div>
            </div>
            <div className='mt-5 flex justify-between space-x-8 w-full'>
              <div className='justify-center text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Phone Number</h1>
                <p className='text-left text-sm text-gray-300'>{adminData ? adminData.adminPhoneNumber : ''}</p>
              </div>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Home Number</h1>
                <p className='text-right text-sm text-gray-300'>{adminData ? adminData.adminHomeNumber : ''}</p>
              </div>
            </div>
            <div className='mt-5 flex justify-between space-x-8 w-full'>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Aadhar Number</h1>
                <p className='text-left text-sm text-gray-300'>{adminData ? adminData.adminAadharCard : ''}</p>
              </div>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>PAN Number</h1>
                <p className='text-right text-sm text-gray-300'>{adminData ? adminData.adminPANCard : ''}</p>
              </div>
            </div>
            <div className='mt-5 flex justify-between space-x-8 w-full'>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Father Name</h1>
                <p className='text-left text-sm text-gray-300'>{adminData ? adminData.adminFatherName : ''}</p>
              </div>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Mother Name</h1>
                <p className='text-right text-sm text-gray-300'>{adminData ? adminData.adminMotherName : ''}</p>
              </div>
            </div>
            <div className='mt-5 flex justify-between space-x-4 w-full'>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Residential Address</h1>
                <p className='text-left text-sm text-gray-300'>{adminData ? adminData.adminResidentialAddress : ''}</p>
              </div>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>Permanent Address</h1>
                <p className='text-right text-sm text-gray-300'>{adminData ? adminData.adminPermanentAddress : ''}</p>
              </div>
            </div>
            <div className='mt-5 flex justify-between space-x-8 w-full'>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>College City</h1>
                <p className='text-left text-sm text-gray-300'>{adminData ? adminData.city : ''}</p>
              </div>
              <div className='text-center text-gray-800'>
                <h1 className='font-semibold text-md text-center text-slate-200'>College Pincode</h1>
                <p className='text-right text-sm text-gray-300'>{adminData ? adminData.zipcode : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showImageModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50'>
          <div className='relative'>
            <button
              className='absolute top-4 right-4 text-white text-3xl cursor-pointer transform hover:rotate-90 transition duration-300'
              onClick={closeImageModal}
            >
              &times;
            </button>
            <Image
              src={adminData.adminProfile}
              alt="Admin Profile"
              className='rounded-lg'
              width={400}
              height={400}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
