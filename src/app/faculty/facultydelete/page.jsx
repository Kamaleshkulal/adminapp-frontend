import React, { useState } from 'react';
import { ImpulseSpinner } from 'react-spinners-kit';

const FacultyDelete = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        facultyId: ''
    });
    const [facultyName, setFacultyName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchFacultyName = async (facultyId) => {
        setIsFetching(true);
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/adminapp/faculty/${facultyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch faculty name');
                }
                const data = await response.json();
                setFacultyName(data.facultyName || '');
            } catch (error) {
                console.error('Error fetching faculty name:', error);
                setFacultyName('');
            } finally {
                setIsFetching(false);
            }
        }, 2000); 
    };

    const handleBlur = () => {
        if (formData.facultyId) {
            fetchFacultyName(formData.facultyId);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/adminapp/faculty/${formData.facultyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete faculty');
            }
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Error deleting faculty:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 p-10 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
            {isFetching ? (
                <ImpulseSpinner size={60} frontColor="#000" backColor="#ccc" />
            ) : (
                <div className="relative p-8 bg-white w-full max-w-4xl m-auto flex-col flex rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Delete Faculty</h2>
                    <form className="mt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Faculty ID</label>
                                <input
                                    type="text"
                                    name="facultyId"
                                    value={formData.facultyId || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            {formData.facultyId && facultyName && (
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Faculty Name</label>
                                    <input
                                        type="text"
                                        value={facultyName}
                                        readOnly
                                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2 ${isLoading || !facultyName ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading || !facultyName}
                            >
                                {isLoading ? 'Deleting...' : 'Delete'}
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
            )}
        </div>
    );
};

export default FacultyDelete;
