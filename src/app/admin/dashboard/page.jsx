'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import demologo from '../../images/index';
import FacultyProfile from '../../faculty/facultyprofile/page'
import AdminProfile from '../adminprofile/page';
import { IoMdWarning } from "react-icons/io";
import HeadersComponents from "../../common/headercomp/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.css';
import { Bars  } from 'react-loader-spinner';
import axios from 'axios';

const itemsPerPage = 7;

const Dashboard = () => {
    let college_id = '';
    let admin_id = '';
    let admin_email = '';

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true); // State to manage initial loading
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [showSearchWarning, setShowSearchWarning] = useState(false);
    const [adminData, setAdminData] = useState({});
    const [data, setData] = useState([]); // state to store the data fetched from API

    if (adminData) {
        const { adminId, adminEmail, collegeId } = adminData;
        admin_id = adminId;
        admin_email = adminEmail;
        college_id = collegeId;
    } else {
        console.log('Admin data not found in localStorage');
    }

    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('admin')) || {};
        setAdminData(dataFromLocalStorage);

        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/adminapp/faculty/all');
                setData(response.data);
                console.log(response.data);
                setFilteredData(response.data); // Initialize filteredData with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set initial loading to false after 3 seconds
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setShowSearchWarning(true);
            setLoading(true);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            let filtered;
            if (searchTerm.toLowerCase() === 'all') {
                filtered = data;
            } else {
                filtered = data.filter(item => {
                    const { facultyID, facultyName, facultyEmail, rating } = item;

                    // Check if facultyID, facultyName, facultyEmail match the search term
                    if (
                        facultyID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        facultyEmail.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return true;
                    }

                    // Check if rating is greater than 5
                    if (parseFloat(searchTerm) > 5 && rating > parseFloat(searchTerm)) {
                        return true;
                    }

                    return false;
                });
            }
            setFilteredData(filtered);
            setLoading(false);
            setCurrentPage(1);
            setShowSearchWarning(false);
        }, 2000);
    };

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrentPage(prev => Math.min(prev + 1, totalPages));
            setLoading(false);
        }, 1000);
    };

    const handlePrev = () => {
        setLoading(true);
        setTimeout(() => {
            setCurrentPage(prev => Math.max(prev - 1, 1));
            setLoading(false);
        }, 1000);
    };

    const notify = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'warning':
                toast.warning(message);
                break;
            default:
                toast.info(message);
                break;
        }
    };

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = filteredData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className='p-2 w-full'>
            <HeadersComponents
                collegeId={college_id}
            />
            {initialLoading ? (

                <div className="flex items-center mt-2 justify-center">
                    <Bars height="40" width="40" color="#9333ea" ariaLabel="loading" />
                </div>
            ) : (
                <div className='mt-2 flex space-x-5'>
                    <div className='w-7/10'>
                        <FacultyProfile
                        collegeId={college_id}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        showSearchWarning={showSearchWarning}
                        currentData={currentData}
                        loading={loading}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        lastIndex={lastIndex}
                        filteredData={filteredData}
                        />
                    </div>
                    <div className='w-3/10'>
                        <AdminProfile
                        adminId={admin_id} 
                        notify={notify} 
                        />
                    </div>
                </div>
            )}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>

    );
};

export default Dashboard;
