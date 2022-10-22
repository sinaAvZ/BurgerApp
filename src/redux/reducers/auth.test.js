import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe("reducer", () => {
    it("Shoud return initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            userId: null,
            tokenId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        })
    })
    it("Should Return token and userId", () => {
        expect(reducer({
            userId: null,
            tokenId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            userId: "fuck",
            tokenId: "You",
        })).toEqual({
            userId: "fuck",
            tokenId: "You",
            error: null,
            loading: false,
            redirectPath: '/'
        })
    })

})