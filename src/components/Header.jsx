import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
    const { logOut } = useAuth();

    return (
        <div>
            <header className="p-10 bg-indigo-600">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <h1 className="font-bold text-2xl text-indigo-200 text-center">
                        Veterinary Patient {''}
                        <span className="text-white font-black">Manager</span>
                    </h1>
                    <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
                        <Link
                            to="/admin"
                            className="text-white text-sm uppercase font-bold"
                        >
                            Patients
                        </Link>
                        <Link
                            to="/admin/profile"
                            className="text-white text-sm uppercase font-bold"
                        >
                            Profile
                        </Link>
                        <button
                            type="button"
                            className="text-white text-sm uppercase font-bold"
                            onClick={logOut}
                        >
                            Log Out
                        </button>
                    </nav>
                </div>
            </header>
        </div>
    );
};
