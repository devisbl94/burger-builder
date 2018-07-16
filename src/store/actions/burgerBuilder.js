import { createActions } from 'reduxsauce';
import axios from '../../axios-orders';

export const { Types, Creators } = createActions({
    addIngredient: ['ingredientName'],
    removeIngredient: ['ingredientName'],
    setIngredients: ['ingredients'],
    fetchIngredientsFailed: null,
    authSuccess: ['idToken', 'userId'],
    authFail: ['error'],
    authLogout: null,
    setAuthRedirectPath: ['path'],
});

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(Creators.setIngredients(response.data));
            })
            .catch(error => {
                dispatch(Creators.fetchIngredientsFailed());
            });
    }
}