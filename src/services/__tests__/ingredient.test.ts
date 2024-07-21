import {
  initialState,
  constructorBurger,
  addIngredient,
  removeIngredient,
  ingredientApi
} from '../../services/slices/BurgerSlice';

const mockData = {
  fulfilled: {
    type: ingredientApi.fulfilled.type,
    payload: ['ingredient', 'ingredient 2']
  },
  rejected: {
    type: ingredientApi.rejected.type
  }
};

describe('Проверяем работу constructorBurger.extraReducers', () => {
  it('Проверяем getFeedOrders.pending', () => {
    const res = constructorBurger(
      initialState,
      ingredientApi.pending('pending')
    );
    expect(res.isLoading).toBe(true);
  });
  it('Проверяем getFeedOrders.fulfilled', () => {
    const res = constructorBurger(initialState, mockData.fulfilled);
    expect(res.isLoading).toBe(false);
    expect(res.ingredients).toBe(mockData.fulfilled.payload);
  });
  it('Проверяем getFeedOrders.rejected', () => {
    const res = constructorBurger(initialState, mockData.rejected);
    expect(res.isLoading).toBe(false);
  });
});

describe('Проверка добавления и удаления ingredient', () => {
  const ingredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    id: '1'
  };
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    ingredients: [],
    isLoading: false,
    error: null
  };
  it('Проверка добавление ингредиента', () => {
    const newState = constructorBurger(initialState, addIngredient(ingredient));
    expect(newState.constructorItems.ingredients[0]._id).toEqual(
      ingredient._id
    );
  });
  it('Проверка удаление ингредиента', () => {
    const newState = constructorBurger(
      initialState,
      removeIngredient(ingredient)
    );
    expect(newState.constructorItems.ingredients).not.toContainEqual(
      ingredient
    );
  });
});
