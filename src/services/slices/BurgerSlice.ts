import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { nanoid } from 'nanoid';
import { getIngredientsApi } from '@api';

export type TConstructorBurgerState = {
  ingredients: TIngredient[];
  isLoading: Boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorBurgerState = {
  ingredients: [],
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const ingredientApi = createAsyncThunk(
  'ingredients/ingredientApi',
  getIngredientsApi
);

const constructorBurgerSlice = createSlice({
  name: 'burgerSlice',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item: { id: string }) => item.id !== payload.id
        );
    },
    resetConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.isLoading = false;
    },
    moveIngredientUp: (state, { payload }: PayloadAction<number>) => {
      const move = state.constructorItems.ingredients[payload - 1];

      state.constructorItems.ingredients[payload - 1] =
        state.constructorItems.ingredients[payload];
      console.log(payload);

      state.constructorItems.ingredients[payload] = move;
    },
    moveIngredientDown: (state, { payload }: PayloadAction<number>) => {
      const move = state.constructorItems.ingredients[payload + 1];
      state.constructorItems.ingredients[payload + 1] =
        state.constructorItems.ingredients[payload];

      state.constructorItems.ingredients[payload] = move;
    }
  },
  selectors: {
    getIngredient: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading,
    getConstructorItems: (state) => state.constructorItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ingredientApi.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ingredientApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIsLoading, getIngredient, getConstructorItems } =
  constructorBurgerSlice.selectors;
export const {
  addBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorBurgerSlice.actions;
export const constructorBurger = constructorBurgerSlice.reducer;
