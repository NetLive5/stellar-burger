import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  getIsLoading,
  resetConstructor
} from '../../services/slices/BurgerSlice';
import {
  clearOrder,
  createOrder,
  getOrderData,
  getRequest
} from '../../services/slices/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/AuthSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getIsLoading);
  const orderLo = useSelector(getRequest);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const order: string[] = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map(
        (ingredient: { _id: string }) => ingredient._id
      ),
      constructorItems.bun!._id
    ];

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
