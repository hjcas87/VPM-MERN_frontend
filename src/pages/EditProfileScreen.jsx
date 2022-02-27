import { useEffect, useState } from 'react';
import { AdminNav } from '../components/AdminNav';
import { AlertMsg } from '../components/AlertMsg';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

export const EditProfileScreen = () => {
    const { auth, editProfile } = useAuth();
    const [formValues, handleInputChange, setValue] = useForm();
    const { name, web, phone, email } = formValues;
    const [alert, setAlert] = useState({});
    useEffect(() => {
        setValue(auth);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim().length === 0 || email.trim().length === 0) {
            return setAlert({
                msg: 'There can be no empty fields',
                error: true,
            });
        }
        setAlert({});
        const res = await editProfile(formValues);
        setAlert(res);
    };
    const { msg } = alert;
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">
                Edit Your Profile
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your {''} profile here
            </p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <AlertMsg alert={alert} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="name"
                                value={name || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                web
                            </label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"
                                value={web || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                phone
                            </label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="phone"
                                value={phone || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                email
                            </label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"
                                value={email || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Save Changes"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
