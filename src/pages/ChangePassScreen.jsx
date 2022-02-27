import { useState } from 'react';
import { AdminNav } from '../components/AdminNav';
import { AlertMsg } from '../components/AlertMsg';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

export const ChangePassScreen = () => {
    const { saveNewPassword } = useAuth();
    const [alert, setAlert] = useState({});
    const [formValues, handleInputChange] = useForm({
        password1: '',
        password2: '',
    });

    const { password1, password2 } = formValues;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formValues).some((field) => field === '')) {
            setAlert({
                msg: 'All fields are required',
                error: true,
            });
            return;
        }
        if (
            Object.values(formValues).some((field) => field.trim().length < 6)
        ) {
            setAlert({
                msg: 'The password must be at least 6 characters',
                error: true,
            });
            return;
        }
        const res = await saveNewPassword(formValues);
        setAlert(res);
    };

    const { msg } = alert;
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">
                Edit Your Password
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your {''} password here
            </p>
            <div className="w-full md:w-1/2 mx-auto bg-white shadow rounded-lg p-5">
                {msg && <AlertMsg alert={alert} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">
                            Current Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your current password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="password1"
                            value={password1 || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">
                            New password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="password2"
                            value={password2 || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <input
                        type="submit"
                        value="update password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>
            </div>
        </>
    );
};
