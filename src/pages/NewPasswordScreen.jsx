import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertMsg } from '../components/AlertMsg';
import axiosClient from '../config/axios';
import { useForm } from '../hooks/useForm';

export const NewPasswordScreen = () => {
    const { token } = useParams();
    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [passwordModified, setPasswordModified] = useState(false);
    const [passValue, handleInputChange] = useForm({
        password: '',
    });

    const { password } = passValue;
    const { msg, error = false } = alert;

    console.log(error);

    useEffect(() => {
        const checkToken = async () => {
            try {
                await axiosClient(`/veterinary/password-reset/${token}`);
                setValidToken(true);
                setAlert({
                    msg: 'Put your new password!',
                    error: false,
                });
            } catch (error) {
                setAlert({
                    msg: 'There was an error!',
                    error: true,
                });
            }
        };
        checkToken();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(password);
        if (password.trim().length < 6) {
            setAlert({
                msg: 'Password must be at least 6 characaters',
                error: true,
            });
            return;
        }
        try {
            const url = `/veterinary/password-reset/${token}`;
            const { data } = await axiosClient.post(url, { password });
            setAlert({
                msg: data.msg,
                error: false,
            });
            setPasswordModified(true);
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    return (
        <>
            <div className="p-5 md:p-0">
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recover your access and do not lose your{' '}
                    <span className="text-black">patients</span>
                </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <AlertMsg alert={alert} />}
                {validToken && (
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                New password
                            </label>
                            <input
                                type="password"
                                placeholder="Choose your new password"
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                autoComplete="off"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Save"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        />
                    </form>
                )}

                { passwordModified &&
                    <Link
                        className="block text-center my-5 text-gray-500"
                        to="/"
                    >
                        Sign In
                    </Link>
                }
            </div>
        </>
    );
};
