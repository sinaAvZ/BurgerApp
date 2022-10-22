import * as importAction from '../actions/actionTypes'


const initialize = {
    data: [],
    order: [],
    loading: false,
    error: false,
    loadingOrder: false,
    errOrder: null
}


const reducerOrder = (state = initialize, action) => {
    switch (action.type) {
        case importAction.SET_INGREDIENTS_ORDER: {
            const Data = {
                ...action.data,
                id: action.data.contactData.email
            }
            return {
                ...state,
                order: state.order.concat(Data),
                loading: false
            }
        }
        case importAction.SETINGREDIENTSLOADINGFALSE: {
            return {
                ...state,
                loading: false
            }
        }
        case importAction.SETLOADINGINGREDIENTSTRUE: {
            return {
                ...state,
                loading: true
            }
        }
        case importAction.GET_INGREDIENTS_ORDER: {
            console.log(action.order);
            return {
                ...state,
                data: action.order,
                loadingOrder: false
            }
        }

        case importAction.GET_INGREDIENTS_ORDER_FAILED: {
            return {
                ...state,
                errOrder: action.errOrder
            }
        }
    }
    return state
}

export default reducerOrder