import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

    if (!user && !isAuthPage) {
      navigate('/', { replace: true });
    }
  }, [navigate, location]);

  return children;
};

export default ProtectedRoute;