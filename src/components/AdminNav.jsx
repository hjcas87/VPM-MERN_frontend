import { Link } from 'react-router-dom';

export const AdminNav = () => {
    return (
        <nav className='flex gap-3 mx-10'>
            <Link
                to="/admin/profile"
                className="font-bold uppercase text-gray-500"
            >Profile</Link>
            <Link
                to="/admin/change-password"
                className="font-bold uppercase text-gray-500"
            >Change Password</Link>
        </nav>
    );
};
