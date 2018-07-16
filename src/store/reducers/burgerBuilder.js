import { createReducer } from 'reduxsauce';
import { Types as ReduxSauceTypes } from 'reduxsauce';
import actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INITIAL_STATE = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state = INITIAL_STATE, action) => {
    const { ingredientName } = action;
    const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state = INITIAL_STATE, action) => {
    const { ingredientName } = action;
    const updatedIng = { [ingredientName]: state.ingredients[ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
};

const setIngredients = (state = INITIAL_STATE, action) => {
    const { ingredients } = action;
    return updateObject(state, {
        ingredients: ingredients,
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state = INITIAL_STATE, action) => {
    return updateObject(state, { error: true });
}

const defaultHandler = (state = INITIAL_STATE) => {
    return state;
}

const HANDLERS = {
    [actionTypes.ADD_INGREDIENT]: addIngredient,
    [actionTypes.REMOVE_INGREDIENT]: removeIngredient,
    [actionTypes.SET_INGREDIENTS]: setIngredients,
    [actionTypes.FETCH_INGREDIENTS_FAILED]: fetchIngredientsFailed,
    [ReduxSauceTypes.DEFAULT]: defaultHandler
}

export default createReducer(INITIAL_STATE, HANDLERS);