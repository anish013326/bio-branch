import React, { useContext, useEffect, useState } from 'react';
import LinkBox from '@/components/LinkBox';
import UserHeader from '@/components/UserHeader';
import { toast } from 'react-toastify';
import UserContext from '@/context/userContext';

const ModernDashboard = () => {
    const [data, setData] = useState({});
    const { setUserData } = useContext(UserContext);

    useEffect(() => {
        if (!localStorage.getItem('BioTreeToken')) {
            return (window.location.href = '/login');
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenMail: localStorage.getItem('BioTreeToken'),
            }),
        };

        fetch('https://bio-branch-server.onrender.com/data/dashboard', options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === 'error') {
                    return toast.error('Error happened');
                }
                setData(data.userData);
                setUserData(data.userData);
                localStorage.setItem('userHandle', data.userData.handle);
                // toast.success(data.message);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <UserHeader />
                <main className="container mx-auto p-6">
                    <h1 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <LinkBox
                            lbTitle="Links"
                            lbNumber={data.links || 0}
                            lbSvg="email"
                            lbTheme="red"
                        />
                        <LinkBox
                            lbTitle="Total Clicks"
                            lbNumber="30%"
                            lbSvg="growth"
                            lbTheme="yellow"
                        />
                        <LinkBox
                            lbTitle="Total Shares"
                            lbNumber="39"
                            lbSvg="share"
                            lbTheme="green"
                        />
                        <LinkBox
                            lbTitle="Total Retention"
                            lbNumber="50%"
                            lbSvg="url"
                            lbTheme="blue"
                        />
                    </section>
                    <section className="mt-8 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            
                            <div className="bg-gray-200 p-4 rounded-lg shadow">
                                <h3 className="font-medium">Activity 1</h3>
                                <p className="text-gray-700">Description of activity 1...</p>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow">
                                <h3 className="font-medium">Activity 2</h3>
                                <p className="text-gray-700">Description of activity 2...</p>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow">
                                <h3 className="font-medium">Activity 3</h3>
                                <p className="text-gray-700">Description of activity 3...</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default ModernDashboard;
