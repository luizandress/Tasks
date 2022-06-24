import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, Login } from '../pages';

export function RouteIndex() {
    const { user, loading } = useAuth();
    if (loading) return null;
    return (
        <Router>
            {
                user?.name ?
                    <Routes>
                        <Route path='/' element={<Home />} />            
                    </Routes>
                    :
                    <Login />
            }
        </Router>
    );
}