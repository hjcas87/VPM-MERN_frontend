import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AlertMsg } from '../components/AlertMsg';
import axiosClient from '../config/axios';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [alert, setAlert] = useState({});
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formValues;
    const { msg } = alert;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim().length === 0) {
            return setAlert({
                msg: 'This field cannot be empty!',
                error: true,
            });
        }
        if (password.trim().length < 6) {
            return setAlert({
                msg: 'Password must be at least 6 characters!',
                error: true,
            });
        }
        setAlert({});
        try {
            const { data } = await axiosClient.post('/veterinary/login', {
                email,
                password,
            });
            localStorage.setItem('apv_user_token', data.token);
            setAuth(data);
            navigate('/admin');
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    return (
        <>
            <div className="p-5 md:p-0">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Sign in and manage your{' '}
                    <span className="text-black">patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <AlertMsg alert={alert} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="off"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Your Password"
                            autoComplete="off"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Sign In"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/register"
                    >
                        Create new account
                    </Link>
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/password-reset"
                    >
                        Forgot password?
                    </Link>
                </nav>
            </div>
        </>
    );
};
