import * as importAction from '../actions/actionTypes'


const initialize = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    loading: false,
    building: false,
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

// const addIngredient = (state, action) => {
//     return {
//         ...state,
//         ingredients: {
//             ...state.ingredients,
//             [action.igName]: state.ingredients[action.igName] + 1

//         },
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName]
//     }
// }

// const removeIngredient = (state, action) => {
//     return {
//         ...state,
//         ingredients: {
//             ...state.ingredients,
//             [action.igName]: state.ingredients[action.igName] - 1
//         },
//         totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igName]

//     }
// }

// const propsDefault = (state, action) => {
//     return {
//         ...state,
//         ingredients: {
//             salad: 0,
//             cheese: 0,
//             meat: 0,
//             bacon: 0
//         },
//         totalPrice: 4,
//     }
// }

// const fetchIngredients=(state,action)=>{
//      return {
//                 ...state,
//                 ingredients: action.ingredients,
//                 error: false,
//                 totalPrice: 4
//             }
// }

// const fetchIngredientsFailed=(state,action)=>{
//     return {
//                 ...state,
//                 error: true
//             }
// }
// const reducer = (state = initialize, action) => {
//     switch (action.type) {
//         case importAction.ADD_INGREDIENT: return addIngredient(state, action)
//         case importAction.REMOVE_INGREDIENT: return removeIngredient(state, action)
//         case importAction.PROPS_DEFAULT: return propsDefault(state, action)
//         case importAction.FETCHINGREDIENTS: return fetchIngredients(state,action)
//         case importAction.FETCH_INGREDIENTS_FAILED: fetchIngredientsFailed(state,action)
//         default:
//             return state;
//     }

// }


const reducer = (state = initialize, action) => {
    switch (action.type) {
        case importAction.ADD_INGREDIENT: {

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.igName]: state.ingredients[action.igName] + 1

                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName],
                building: true
            }

        };
        case importAction.REMOVE_INGREDIENT: {

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.igName]: state.ingredients[action.igName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igName],
                building: true

            }
        };
        case importAction.PROPS_DEFAULT: {
            return {
                ingredients: null,
                totalPrice: 4,
                error: false,
                loading: false,
                building: false,

            }
        }
        case importAction.FETCHINGREDIENTS: {
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            }
        }
        case importAction.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }

        }



        default:
            return state;
    }

}

export default reducer;