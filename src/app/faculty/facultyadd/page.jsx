import React, { useState } from 'react';

const FacultyAdd = ({ onClose, collegeId, onAdd }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        facultyID: '',
        facultyName: '',
        facultyProfile: '',
        facultyPermanentAddress: '',
        facultyResidentialAddress: '',
        facultyFatherName: '',
        facultyMotherName: '',
        facultyPassword: '',
        facultyPANCard: '',
        facultyAadharCard: '',
        facultyPhoneNumber: '',
        facultyPincode: '',
        facultyCity: '',
        facultyHomeNumber: '',
        facultyPassword: '',
        facultyEmail: '',
        studentsTaught: 0,
        subjectsCount: 0,
        passRate: 0,
        failRate: 0,
        rating: 0,
        college: {
            collegeID: collegeId,
            collegeName: '',
            collegeCity: '',
            collegePincode: ''
        },
        researchProjects: [],
        teachings: []
    });

    const validateForm = () => {
        let formErrors = {};
        if (!formData.facultyName) formErrors.facultyName = 'Name is required';
        if (!formData.facultyProfile) formErrors.facultyName = 'Profile is required';
        if (!formData.facultyEmail) formErrors.facultyEmail = 'Email is required';
        if (!formData.facultyAadharCard) formErrors.facultyAadharCard = 'Aadhar Card Number is required';
        if (!formData.facultyPANCard) formErrors.facultyPANCard = 'PAN Card Number is required';
        if (!formData.facultyPhoneNumber) formErrors.facultyPhoneNumber = 'Phone Number is required';
        // if (!formData.adminHomeNumber) formErrors.adminHomeNumber = 'Home Number is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAdd = () => {
        fetch('http://localhost:8080/api/v1/adminapp/faculty/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error adding faculty:', data.error);
                    setIsLoading(false);
                } else {
                    console.log('Faculty added:', data);
                    setIsLoading(true);
                    onAdd();
                    window.location.reload(); 
                }
            })
            .catch(error => {
                console.error('Error adding faculty:', error);
                setIsLoading(false);
            });
    };


    const handleSubmit = () => {
        if (validateForm()) {
            handleAdd();
        }
    };
    return (
        <div className="fixed inset-0 z-50 p-10 overflow-auto bg-gray-800 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-4xl m-auto flex-col flex rounded-lg">
                <h2 className="text-2xl font-bold  text-center mb-4">Add Faculty</h2>
                <form className="mt-4">
                    <div className="col-span-2">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="facultyName"
                                    value={formData.facultyName || ''}
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.facultyName ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.facultyName && <p className="text-red-500 text-xs italic">{errors.facultyName}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Profile Url</label>
                                <input
                                    type="text"
                                    name="facultyProfile"
                                    value={formData.facultyProfile || ''}
                                    onChange={handleChange}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="facultyEmail"
                                    value={formData.facultyEmail || ''}
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.facultyEmail ? 'border-red-500' : ''}`}
                                    required
                                />
                                {errors.facultyEmail && <p className="text-red-500 text-xs italic">{errors.facultyEmail}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Default Password</label>
                                <input
                                    type="password"
                                    name="facultyPassword"
                                    value={formData.facultyPassword || ''}
                                    onChange={handleChange}
                                    required
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.facultyAadharCard ? 'border-red-500' : ''}`}
                                />
                                {errors.facultyAadharCard && <p className="text-red-500 text-xs italic">{errors.facultyAadharCard}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">College ID</label>
                                <input
                                    type="text"
                                    name="collegeID"
                                    value={collegeId || ''}
                                    required
                                    disabled
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Father Name</label>
                                <input
                                    type="text"
                                    name="facultyFatherName"
                                    value={formData.facultyFatherName || ''}
                                    required
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Mother Name</label>
                                <input
                                    type="text"
                                    name="facultyMotherName"
                                    value={formData.facultyMotherName || ''}
                                    onChange={handleChange}
                                    required
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Aadhar Card Number</label>
                                <input
                                    type="text"
                                    name="facultyAadharCard"
                                    value={formData.facultyAadharCard || ''}
                                    onChange={handleChange}
                                    required
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.facultyAadharCard ? 'border-red-500' : ''}`}
                                />
                                {errors.facultyAadharCard && <p className="text-red-500 text-xs italic">{errors.facultyAadharCard}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">PAN Card Number</label>
                                <input
                                    type="text"
                                    name="facultyPANCard"
                                    value={formData.facultyPANCard || ''}
                                    required
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.facultyPANCard ? 'border-red-500' : ''}`}
                                />
                                {errors.facultyPANCard && <p className="text-red-500 text-xs italic">{errors.facultyPANCard}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Primary Number</label>
                                <input
                                    type="text"
                                    name="facultyPhoneNumber"
                                    value={formData.facultyPhoneNumber || ''}
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.facultyPhoneNumber ? 'border-red-500' : ''}`}
                                />
                                {errors.facultyPhoneNumber && <p className="text-red-500 text-xs italic">{errors.facultyPhoneNumber}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Secondary Number</label>
                                <input
                                    type="text"
                                    name="adminHomeNumber"
                                    value={formData.facultyHomeNumber || ''}
                                    onChange={handleChange}
                                    required
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.adminHomeNumber ? 'border-red-500' : ''}`}
                                />
                                 {errors.facultyHomeNumber && <p className="text-red-500 mr- text-xs italic">{errors.facultyHomeNumber}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                <input
                                    type="text"
                                    name="facultyCity"
                                    value={formData.facultyCity || ''}
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                                <input
                                    type="text"
                                    name="facultyPincode"
                                    value={formData.facultyPincode || ''}
                                    onChange={handleChange}
                                    required
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                                />
                            </div>
                           
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Permanent Address</label>
                                <input
                                    type="text"
                                    name="facultyPermanentAddress"
                                    value={formData.facultyPermanentAddress|| ''}
                                    onChange={handleChange}
                                    required
                                    className={"border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Residential Address</label>
                                <input
                                    type="text"
                                    name="facultyResidentialAddress"
                                    value={formData.facultyResidentialAddress || ''}
                                    onChange={handleChange}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2 `}
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

export default FacultyAdd;
