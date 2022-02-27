import { usePatients } from '../hooks/usePatients';
import { PatientItem } from './PatientItem';

export const ListPatients = () => {
    const { patients } = usePatients();

    return (
        <>
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">
                        Patient list
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Manage your patients and appointments
                    </p>

                    {patients.map((patient) => (
                        <PatientItem key={patient._id} patient={patient} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">
                        There are no patients
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Start adding patients and they will appear here
                    </p>
                </>
            )}
        </>
    );
};
