import axios from '../../axios'
import * as actionTypes from './actionTypes'

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
const saveIngridientsInState = (ing) => {
    return {
        type: actionTypes.FETCHINGREDIENTS,
        ingredients: ing
    }
}


export const fetchIngredients = () => {
    return dispatch => {

        axios.get('/ingredients.json').then(res => {

            return dispatch(saveIngridientsInState(res.data))
        }).catch(err => {
            dispatch(fetchIngredientsFailed());
        })
    }

}


export const addIngredients = (igName) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        igName: igName
    }

}

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        igName: igName
    }
}
export const setPropsToDefault=()=>{
    return{
        type:actionTypes.PROPS_DEFAULT
    }
}