import { useSelector } from '../services/store';
import { Navigate, useLocation, Outlet } from 'react-router';
import { getIsAuth } from './slices/AuthSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const userAuth = useSelector(getIsAuth);

  if (!onlyUnAuth && !userAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && userAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
