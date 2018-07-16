import { createSelector } from 'reselect';

const ingredientsSelector = state => state.burgerBuilder.ingredients;
const totalPriceSelector = state => state.burgerBuilder.totalPrice;
const buildingSelector = state => state.burgerBuilder.building;
const errorSelector = state => state.burgerBuilder.error;

export const getIngredients = createSelector(
    ingredientsSelector,
    ingredients => ingredients
);

export const getTotalPrice = createSelector(
    totalPriceSelector,
    totalPrice => totalPrice
);

export const isBuildingBurger = createSelector(
    buildingSelector,
    building => building
);

export const getError = createSelector(
    errorSelector,
    error => error ? error.message : null
);
