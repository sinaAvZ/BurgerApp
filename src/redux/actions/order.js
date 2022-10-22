import * as actionTypes from './actionTypes'
import axios from '../../axios'



const setIngredientsOrder = (order) => {
    return {
        type: actionTypes.SET_INGREDIENTS_ORDER,
        data: order
    }
}
const setIngredientLoadingfalse = () => {
    return {
        type: actionTypes.SETINGREDIENTSLOADINGFALSE
    }
}
export const setLoadingIngredientsTrue = () => {
    return {
        type: actionTypes.SETLOADINGINGREDIENTSTRUE
    }
}
export const saveIngredients = (data, history) => {

    return (dispatch,getState )=> {
 
        axios.post('/customer.json?auth='+getState().auth.tokenId, data)
            .then(res => {
                dispatch(setIngredientsOrder(data))
                history.push('/')
            })
            .catch(err => {
                dispatch(setIngredientLoadingfalse())

            })
    }
}
const getCustomerFunc = (data) => {
    return {
        type: actionTypes.GET_INGREDIENTS_ORDER,
        order: data
    }
}
const getCustomerFunErr = err => {
    return {
        type: actionTypes.GET_INGREDIENTS_ORDER_FAILED,
        errOrder: err
    }
}
export const getCustomerOrder = (token,userId) => {
    return dispatch => {
      
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/customer.json' + queryParams)
        .then( res => {
            const fetchedOrders = [];
            for ( let key in res.data ) {
                fetchedOrders.push( {
                    ...res.data[key],
                    id: key
                } );
            }
            console.log(fetchedOrders);
            dispatch(getCustomerFunc(fetchedOrders));
        } )
            .catch(err => { 
                dispatch(getCustomerFunErr(err.message)) })
    }
}