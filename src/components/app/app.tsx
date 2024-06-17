import {
  Feed,
  ConstructorPage,
  NotFound404,
  Register,
  Login,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { ingredientApi } from '../../services/slices/BurgerSlice';

const RouteApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(ingredientApi());
  }, []);

  const background = location.state?.background;

  return (
    <>
      <Routes location={background}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal title='Заказы' onClose={onClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиенты' onClose={onClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='Заказы' onClose={onClose}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <RouteApp />
  </div>
);

export default App;
