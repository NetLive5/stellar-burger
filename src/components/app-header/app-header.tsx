import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/AuthSlice';

export const AppHeader: FC = () => {
  const profile = useSelector(getUser);
  return <AppHeaderUI userName={'' || profile.name} />;
};
