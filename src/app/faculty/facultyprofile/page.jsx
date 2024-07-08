import React, { useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { MdAutoDelete } from "react-icons/md";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Image from 'next/image';
import FacultyInfo from '../../faculty/facultyinfo/page';
import FacultyAdd from '../../faculty/facultyadd/page';
import FacultyDelete from '../../faculty/facultydelete/page';
import 'react-toastify/dist/ReactToastify.css';

const FacultyProfile = ({
    collegeId,
    searchTerm,
    setSearchTerm,
    handleSearch,
    currentData,
    loading,
    totalPages,
    currentPage,
    handleNext,
    handlePrev,
    lastIndex,
    filteredData,
}) => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [showAddFaculty, setShowAddFaculty] = useState(false);
    const [showDeleteFaculty, setShowDeleteFaculty] = useState(false);

    const handleViewClick = (faculty) => {
        setSelectedFaculty(faculty);
        setPopupVisible(true);
    };
    console.log(currentData);

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedFaculty(null);
    };

    const handleAddFaculty = () => {
        setShowAddFaculty(true);
    };


    const handleCloseAddFaculty = () => {
        setShowAddFaculty(false);
    };

    const handleDeleteFaculty = () => {
        setShowDeleteFaculty(true);
    };

    const handleCloseDeleteFaculty = () => {
        setShowDeleteFaculty(false);
    };
    return (
        <div className='flex space-x-5'>
            <div className=''>
                <div className=' bg-slate-50 p-2 border rounded-lg shadow-lg  justify-start w-full'>
                    <div className='flex justify-between items-center'>
                        <input
                            type='text'
                            placeholder='Search...'
                            className='p-2 rounded-lg w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className=' flex  space-x-6'>
                            <button
                                onClick={handleSearch}
                                className='flex  w-20 p-2 items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                            >
                                <FaSearch size={20} />
                            </button>

                            <button
                                onClick={handleAddFaculty}
                                className=' flex p-2 w-20 items-center justify-center bg-green-600 text-white  rounded-lg hover:bg-green-700 '
                            >
                                <BsDatabaseFillAdd size={20} />
                            </button>

                            <button
                                onClick={handleDeleteFaculty}
                                className=' flex p-2 w-20 items-center justify-center bg-red-500 text-white  rounded-lg  hover:bg-red-700 '
                            >
                                <MdAutoDelete size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-2 bg-slate-50 p-2 border rounded shadow-lg'>
                    <div className='w-full'>

                        <table className='table-auto shadow-lg w-full' style={{ width: '100%', minWidth: '1009px' }}>
                            <thead className='bg-slate-200 w-full border'>
                                <tr>
                                    <th className="px-4 py-2 text-left">SI</th> {/* Add SI column header */}
                                    <th className="px-4 py-2 text-left">Faculty ID</th>
                                    <th className="px-4 py-2 text-left">Faculty Name</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Pass Rate</th>
                                    <th className="px-4 py-2 text-left">Fail Rate</th>
                                    <th className="px-4 py-2 text-left">Rating</th>
                                    <th className="px-4 py-2 text-left">Phone Number</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody className='table-auto' style={{ width: '100%' }}>
                                {loading ? (
                                    <tr style={{ width: '100%' }}>
                                        <td colSpan='9' className='text-center py-10 w-full' style={{ width: '100%' }}>
                                            <div className='flex justify-center items-center' style={{ width: '100%' }}>
                                                <MutatingDots
                                                    height='90'
                                                    width='90'
                                                    color='#9333ea'
                                                    secondaryColor='#4fa94d'
                                                    radius='12.5'
                                                    ariaLabel='mutating-dots-loading'
                                                    style={{ width: '100%' }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.length ? currentData.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                            <td className="border px-4 py-2">{index + 1}</td> {/* Serial number */}
                                            <td className="border px-4 py-2">{item.facultyID}</td>
                                            <td className="border px-4 py-2">{item.facultyName}</td>
                                            <td className="border px-4 py-2">{item.facultyEmail}</td>
                                            <td className="border px-4 py-2">{item.passRate}</td>
                                            <td className="border px-4 py-2">{item.failRate}</td>
                                            <td className="border px-4 py-2">{item.rating}</td>
                                            <td className="border px-4 py-2">{item.facultyPhoneNumber}</td>
                                            <td className="border px-4 py-2">
                                                <div className="flex flex-row space-x-3">
                                                    <div className="cursor-pointer text-2xl text-slate-50 hover:text-slate-300">
                                                        <button
                                                            className="bg-pink-400 rounded-lg p-2"
                                                            onClick={() => handleViewClick(item)}
                                                        >
                                                            <FaEye />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="9" className="text-center py-4">
                                                No results found.
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>

                        <div className='flex justify-between mt-4'>
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className={`flex items-center p-2 space-x-2 text-green-500 hover:text-green-700 font-bold rounded-lg ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                            >
                                <IoIosArrowDropleftCircle className="mr-1" size={25} />
                                Previous
                            </button>
                            <div className='text-sm text-gray-600'>
                                Page {currentPage} of {totalPages}
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`flex items-center p-2 space-x-2 text-green-500 hover:text-green-700 font-bold rounded-lg ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                            >
                                Next
                                <IoIosArrowDroprightCircle className="ml-1" size={25} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popup for Viewing Faculty Details */}
                {isPopupVisible && (
                    <FacultyInfo
                        selectedFaculty={selectedFaculty}
                        onClose={handleClosePopup}
                    />
                )}

                {showAddFaculty && (
                    <FacultyAdd
                        collegeId={collegeId}
                        onClose={handleCloseAddFaculty}
                        onAdd={() => {
                            handleCloseAddFaculty();
                            window.location.reload();

                        }}
                    />
                )}

                {showDeleteFaculty && (
                    <FacultyDelete
                        collegeId={collegeId}
                        onClose={handleCloseDeleteFaculty}
                        onAdd={() => {
                            handleCloseDeleteFaculty();
                            window.location.reload();

                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default FacultyProfile;
