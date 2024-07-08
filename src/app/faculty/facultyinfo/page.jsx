import React from 'react';
import Image from 'next/image';

const FacultyInfo = ({ selectedFaculty, onClose }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 max-w-md  overflow-y-auto rounded-lg shadow-lg">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
                    >
                        Close
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-4">Faculty Details</h2>
                    <div className="flex items-center mb-2">
                        <Image
                            src={selectedFaculty.facultyProfile} // Replace with actual path to faculty image
                            alt="Faculty"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <div className="ml-3">
                            <h3 className="text-lg font-semibold">{selectedFaculty.facultyName}</h3>
                            <p className="text-gray-600">{selectedFaculty.subjectsTaught}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold">Faculty ID:</h4>
                            <p>{selectedFaculty.facultyID}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Fathers Name:</h4>
                            <p>{selectedFaculty.facultyFatherName}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Mothers Name:</h4>
                            <p>{selectedFaculty.facultyMotherName}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Aadhar Card:</h4>
                            <p>{selectedFaculty.facultyAadharCard}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Password:</h4>
                            <p>{selectedFaculty.facultyPassword}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">PAN Card:</h4>
                            <p>{selectedFaculty.facultyPANCard}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Rating:</h4>
                            <p>{selectedFaculty.rating}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Passed:</h4>
                            <p>{selectedFaculty.passRate}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Failed:</h4>
                            <p>{selectedFaculty.failRate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyInfo;
