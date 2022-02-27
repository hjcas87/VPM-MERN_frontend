import { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { usePatients } from '../hooks/usePatients';
import { AlertMsg } from './AlertMsg';

const initialState = {
    name: '',
    owner: '',
    email: '',
    date: '',
    symptom: '',
}
export const Form = () => {
    const { savePatient, patient } = usePatients();
    const [alert, setAlert] = useState({});
    const [formValues, handleInputChange, setValues, reset] = useForm(initialState);

    const { name, owner, email, date, symptom } = formValues;
    const { msg } = alert;
    useEffect(() => {
        if (patient?.name) {
            const editPatient = {};
            editPatient.name = patient.name;
            editPatient.owner = patient.owner;
            editPatient.email = patient.email;
            editPatient.date = patient.date;
            editPatient.symptom = patient.symptom;
            editPatient.id = patient._id;
            setValues(editPatient);
        }
    }, [patient]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = Object.values(formValues);

        if (values.some((value) => value.trim().length === 0)) {
            setAlert({ msg: 'There are empty fields', error: true });
            return;
        }
        setAlert({msg: 'Changes have been saved successfully'});
        savePatient(formValues);
        reset(initialState)
    };

    return (
        <>
            <h2 className="font-black text-3xl text-center">Add patients</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Add your patients and manage them
            </p>
            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                {msg && <AlertMsg alert={alert} />}
                <div className="mb-5">
                    <label
                        htmlFor="pet"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Pet's name
                    </label>
                    <input
                        type="text"
                        id="pet"
                        placeholder="Pet's name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        name="name"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="owner"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Owner's name
                    </label>
                    <input
                        type="text"
                        id="owner"
                        placeholder="Owner's name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={owner}
                        name="owner"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Owner email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Owner email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        name="email"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="date"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Discharge date
                    </label>
                    <input
                        type="date"
                        id="date"
                        placeholder="date's name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={date}
                        name="date"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="symptom"
                        className="text-gray-700 uppercase font-bold"
                    >
                        Symtoms
                    </label>
                    <textarea
                        id="symptom"
                        placeholder="Describe the symptoms"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={symptom}
                        name="symptom"
                        onChange={handleInputChange}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"
                    value={formValues.id ? 'Save Changes' : 'Add patient'}
                />
            </form>
        </>
    );
};
