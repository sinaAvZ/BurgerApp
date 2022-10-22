import * as actionTypes from '../actions/actionTypes'

const initial = {
    userId: null,
    tokenId: null,
    error: null,
    loading: false,
    redirectPath: '/'
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.AUTH_SUCCESS: {
            return {...state,
                userId: action.userId,
                tokenId: action.tokenId,
                loading: false,
                error: null
            }
        }
        case actionTypes.AUTH_FAIL: {
            return {
                ...state,
                error: action.error,
                loading: false
            }
        }
        case actionTypes.AUTH_LOGOUT: {
            return {
                ...state,
                userId: null,
                tokenId: null
            }
        }
        case actionTypes.AUTH_PATH: {
            return {
                ...state,
                redirectPath: action.path
            }
        }
        default: return state
    }
}
export default reducer