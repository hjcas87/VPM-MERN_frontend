import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import axiosClient from '../config/axios';
import { AlertMsg } from '../components/AlertMsg';


export const ConfirmAccountScreen = () => {
    const [loading, setLoading] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const [alert, setAlert] = useState({})
    const { id } = useParams();

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `/veterinary/confirm/${id}`;
                const { data } = await axiosClient(url);
                setConfirm(true)
                setAlert({
                    msg: data.msg
                })
            } catch (error) {
                
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setLoading(false)
        };
        confirmAccount();
    }, []);

    return (
        <>
            <div className="p-5 md:p-0">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirm your account and start managing your{' '}
                    <span className="text-black">patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading && <AlertMsg alert={alert}/>}
                {confirm && (
                    <Link
                    className="block text-center my-5 text-gray-500"
                    to="/"
                >
                    Sign In
                </Link>
                )}
            </div>
        </>
    );
};
