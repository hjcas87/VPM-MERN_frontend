import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { PatiensProvider } from './context/PatiensProvider';
import { AuthLayout } from './layout/AuthLayout';
import { PrivatesRoutes } from './layout/PrivatesRoutes';
import { AdminScreen } from './pages/AdminScreen';
import { ChangePassScreen } from './pages/ChangePassScreen';
import { ConfirmAccountScreen } from './pages/ConfirmAccountScreen';
import { EditProfileScreen } from './pages/EditProfileScreen';
import { LoginScreen } from './pages/LoginScreen';
import { NewPasswordScreen } from './pages/NewPasswordScreen';
import { RecoverPasswordScreen } from './pages/RecoverPasswordScreen';
import { RegisterScreen } from './pages/RegisterScreen';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PatiensProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<LoginScreen />} />
                            <Route
                                path="register"
                                element={<RegisterScreen />}
                            />
                            <Route
                                path="password-reset"
                                element={<RecoverPasswordScreen />}
                            />
                            <Route
                                path="password-reset/:token"
                                element={<NewPasswordScreen />}
                            />
                            <Route
                                path="confirm/:id"
                                element={<ConfirmAccountScreen />}
                            />
                        </Route>
                        <Route path="/admin" element={<PrivatesRoutes />}>
                            <Route index element={<AdminScreen />} />
                            <Route path='profile' element={<EditProfileScreen />} />
                            <Route path='change-password' element={<ChangePassScreen />} />
                        </Route>
                    </Routes>
                </PatiensProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
