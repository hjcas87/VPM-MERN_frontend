import { Navigate, Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useAuth } from '../hooks/useAuth';

export const PrivatesRoutes = () => {
    const { auth, loading } = useAuth();

    if (loading) return 'Loading...';
    return (
        <>
            <Header />
            <main className="container mx-auto mt-10">
                {auth?._id ? <Outlet /> : <Navigate to="/" />}
            </main>
            <Footer />
        </>
    );
};
