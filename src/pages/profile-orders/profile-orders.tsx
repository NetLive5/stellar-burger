import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrder,
  getUserOrders,
  getRequest
} from '../../services/slices/OrderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrder);
  const req = useSelector(getRequest);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (req) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
