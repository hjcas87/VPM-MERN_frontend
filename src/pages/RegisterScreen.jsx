import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AlertMsg } from '../components/AlertMsg';
import { useForm } from '../hooks/useForm';
import axiosClient from '../config/axios';

export const RegisterScreen = () => {
    const [formValues, handleInputChange] = useForm({
        name: 'Hernan',
        email: 'correo@correo.com',
        password: '123456',
        confirmPassword: '123456',
    });

    const { name, email, password, confirmPassword } = formValues;

    const [alert, setAlert] = useState({});

    const { msg } = alert;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = Object.values(formValues);

        if (values.some((value) => value.trim().length === 0)) {
            setAlert({ msg: 'There are empty fields', error: true });
            return;
        }
        if (password !== confirmPassword) {
            setAlert({
                msg: 'Password must be the same in both fields',
                error: true,
            });
            return;
        }
        if (password.length < 6) {
            setAlert({
                msg: 'The password must be at least 6 characters',
                error: true,
            });
            return;
        }
        setAlert({});
        try {
            await axiosClient.post('/veterinary', {
                name,
                email,
                password,
            });
            setAlert({
                msg: 'Your account was created successfully, check your email',
                error: false,
            });
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
                    Create an account and manage your{' '}
                    <span className="text-black">patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <AlertMsg alert={alert} />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            autoComplete="off"
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
                            placeholder="Choose your password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            autoComplete="off"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repeat your password
                        </label>
                        <input
                            type="password"
                            placeholder="Repeat your password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            autoComplete="off"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Create"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/"
                    >
                        Do you have an account? Sign In
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
