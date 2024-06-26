import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedsApi, getFeeds } from '../../services/slices/FeedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedsApi());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(feedsApi());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
