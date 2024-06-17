// import { useSelector } from '../services/store';
// import { Navigate, useLocation, Outlet } from 'react-router';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: ProtectedRouteProps) => {
//   const location = useLocation();
//   const { user, isAuthChecked } = useSelector((store) => store.user);

//   if (!isAuthChecked && !user) {
//     return <div>Loading...</div>;
//   }

//   if (!onlyUnAuth && !isAuthChecked) {
//     return <Navigate replace to='/login' state={{ from: location }} />;
//   }

//   if (onlyUnAuth && isAuthChecked) {
//     const from = location.state?.from || { pathname: '/' };
//     return <Navigate replace to={from} />;
//   }

//   return <Outlet />;
// };
