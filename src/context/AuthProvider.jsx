import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('apv_user_token');

            if (!token) {
                return setLoading(false);
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await axiosClient(
                    '/veterinary/profile',
                    config
                );
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setLoading(false);
        };
        authUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem('apv_user_token');
        setAuth({});
    };

    const editProfile = async (dataProfile) => {
        const token = localStorage.getItem('apv_user_token');

        if (!token) {
            return setLoading(false);
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const url = `/veterinary/profile/${dataProfile._id}`;
            const { data } = await axiosClient.put(url, dataProfile, config);
            return {
                msg: 'Saved succefully',
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        }
    };

    const saveNewPassword = async (newPass) => {
        const token = localStorage.getItem('apv_user_token');

        if (!token) {
            return setLoading(false);
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const url = `/veterinary/update-password`;
            const { data } = await axiosClient.put(url, newPass, config);
            return {
                msg: 'Saved succefully',
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        }
    };

    return (
        <div>
            <AuthContext.Provider
                value={{
                    auth,
                    setAuth,
                    loading,
                    logOut,
                    editProfile,
                    saveNewPassword,
                }}
            >
                {children}
            </AuthContext.Provider>
        </div>
    );
};
