import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';

export const PatientsContext = createContext();

export const PatiensProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('apv_user_token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axiosClient('/patients', config);
                setPatients(data);
            } catch (error) {
                console.log(error);
            }
        };
        getPatients();
    }, []);

    const savePatient = async (savePatient) => {
        const token = localStorage.getItem('apv_user_token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        if (savePatient.id) {
            const { data } = await axiosClient.put(
                `/patients/${savePatient.id}`,
                savePatient,
                config
            );
            const updatedPatients = patients.map((storedPatient) =>
                storedPatient._id === data._id ? data : storedPatient
            );
            setPatients(updatedPatients);
        } else {
            try {
                const { data } = await axiosClient.post(
                    '/patients',
                    savePatient,
                    config
                );
                const { updatedAt, createdAt, _v, ...savedPatient } = data;
                setPatients([savedPatient, ...patients]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    };

    const deletePatient = async (id) => {
        const confirmDelete = confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('apv_user_token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axiosClient.delete(
                    `patients/${id}`,
                    config
                );
                const updatedPatients = patients.filter(
                    (storedPatient) => storedPatient._id !== id
                );
                setPatients(updatedPatients);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const setEdition = (patientEdit) => {
        setPatient(patientEdit);
    };
    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdition,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    );
};
