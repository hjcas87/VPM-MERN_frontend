import axiosClient from '../config/axios';

import { Link } from 'react-router-dom';
import { AlertMsg } from '../components/AlertMsg';
import { useForm } from '../hooks/useForm';
import { useState } from 'react';

export const RecoverPasswordScreen = () => {
    const [alert, setAlert] = useState({});
    const [emailValue, handleInputChange] = useForm({
        email: '',
    });
    const { email } = emailValue;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim().length === 0) {
            setAlert({ msg: 'Email is required', error: true });
            return;
        }
        try {
            const { data } = await axiosClient.post(
                '/veterinary/password-reset',
                { email }
            );
            setAlert({msg: data.msg})
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };
    const { msg } = alert;

    return (
        <>
            <div className="p-5 md:p-0">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recover your password and do not lose your{' '}
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
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value="send instructions"
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
                        to="/register"
                    >
                        Create new account
                    </Link>
                </nav>
            </div>
        </>
    );
};
