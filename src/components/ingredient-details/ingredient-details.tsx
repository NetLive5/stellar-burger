import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredient } from '../../services/slices/BurgerSlice';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredient = useSelector(getIngredient);

  const { id } = useParams();

  const ingredientData = ingredient.find((index) => index._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
