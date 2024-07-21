import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { constructorBurger } from './slices/BurgerSlice';
import { user } from './slices/AuthSlice';
import { feed } from './slices/FeedSlice';
import { order } from './slices/OrderSlice';

export const rootReducer = combineReducers({
  // Заменить на импорт настоящего редьюсера
  burgerSlice: constructorBurger,
  user: user,
  feeds: feed,
  order: order
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
