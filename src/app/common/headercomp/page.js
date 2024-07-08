import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import demologo from '../../images/index';
const HeadersComponents = ({ collegeId }) => {
    const [collegeDetails, setCollegeDetails] = useState(null);

    useEffect(() => {
        async function fetchCollegeData() {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/adminapp/college/${collegeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch college details');
                }
                const data = await response.json();
                setCollegeDetails({
                    collegeLogo: data.collegeLogo,
                    collegeName: data.collegeName
                });
            } catch (error) {
                console.error('Error fetching college data:', error);
            }
        }

        fetchCollegeData();
    }, [collegeId]); // Fetch data when collegeId changes or on initial mount

    return (
        <div className='flex flex-col h-full space-y-4'>
            <div className='bg-slate-50 p-2 border rounded-lg shadow'>
                <div className='flex bg-white w-full space-x-4'>
                    <div className='w-full sm:h-32 h-20 bg-purple-600 shadow-lg rounded flex items-center justify-center'>
                        <h1 className='font-bold sm:text-3xl md:text-xl text-center three-d-text'>
                            {collegeDetails ? collegeDetails.collegeName : 'Demo Institute of Technology'}
                        </h1>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='w-32 h-32 border  bg-purple-600  rounded-full flex items-center justify-center'>
                            <div className='bg-white rounded-full overflow-hidden'>
                                {collegeDetails && (
                                    <Image
                                        src={collegeDetails ? collegeDetails.collegeLogo : demologo.demologo}
                                        alt="College Logo"
                                        width={100}
                                        height={100}
                                        className='rounded-full w-full  shadow-background'
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HeadersComponents;
