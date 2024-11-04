import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import WeatherDashboard from './pages/WeatherDashboard';

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <WeatherDashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </AnimatePresence>
            </Router>
        </AuthProvider>
    );
};

export default App;