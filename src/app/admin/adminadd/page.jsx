import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const EditModal = ({ onClose, adminDetails, onSave, notify }) => {
    const initialFormData = adminDetails ? { ...adminDetails, profileImage: adminDetails.adminProfile } : {};
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false); 
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [fieldName, nestedField] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [fieldName]: {
                    ...prevState[fieldName],
                    [nestedField]: value
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    profileImage: reader.result,
                    profileImageFile: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (JSON.stringify(formData) === JSON.stringify(adminDetails)) {
            notify('Admin details are already the same.', 'warning');
            return;
        }

        try {
            setIsLoading(true);
            await axios.put(`http://localhost:8080/api/v1/adminapp/admin/${adminDetails.adminID}`, formData);
            setTimeout(() => {
                setIsLoading(false);
                onSave();
                onClose();
            }, 2000); // 2 seconds delay

        } catch (error) {
            console.error('Error saving data:', error);
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 p-10 overflow-auto bg-gray-800 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-4xl m-auto flex-col flex rounded-lg">
                <h2 className="text-lg text-center font-semibold mb-4">Edit Admin Details</h2>
                <form>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-3 flex justify-center items-center">
                            <div className="mb-4 flex justify-center items-center">
                                {formData.profileImage && (
                                    <img
                                        src={formData.profileImage}
                                        alt="Profile"
                                        className="mt-2 w-24 h-24 rounded-full object-cover border border-gray-300"
                                    />
                                )}
                                {/* <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                /> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="adminName"
                                    value={formData.adminName || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={formData.adminEmail || ''}
                                    disabled
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Admin ID
                                </label>
                                <input
                                    type="text"
                                    name="adminID"
                                    value={formData.adminID || ''}
                                    disabled
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    College ID
                                </label>
                                <input
                                    type="text"
                                    name="collegeID"
                                    value={formData.collegeId || ''}
                                    disabled
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Father Name
                                </label>
                                <input
                                    type="text"
                                    name="adminFatherName"
                                    value={formData.adminFatherName || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mother Name
                                </label>
                                <input
                                    type="text"
                                    name="adminMotherName"
                                    value={formData.adminMotherName || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Aadhar Card Number
                                </label>
                                <input
                                    type="text"
                                    name="adminAadharCard"
                                    value={formData.adminAadharCard || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    PAN Card Number
                                </label>
                                <input
                                    type="text"
                                    name="adminPANCard"
                                    value={formData.adminPANCard || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="adminPhoneNumber"
                                    value={formData.adminPhoneNumber || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Home Number
                                </label>
                                <input
                                    type="text"
                                    name="adminHomeNumber"
                                    value={formData.adminHomeNumber || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="adminCity"
                                    value={formData.adminCity || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="adminPincode"
                                    value={formData.adminPincode || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Permanent Address
                                </label>
                                <input
                                    type="text"
                                    name="adminPermanentAddress"
                                    value={formData.adminPermanentAddress || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Residential Address
                                </label>
                                <input
                                    type="text"
                                    name="adminResidentialAddress"
                                    value={formData.adminResidentialAddress || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading} 
                        >
                            {isLoading ? 'Saving...' : 'Save'} 
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
