import {INDEX_FETCH} from  '../Actions/ActionTypes'
const initialState = {
    currentSelectedIndex : -1
}

const Index_Selection = (state = initialState, action) => {
    switch (action.type) {
        case INDEX_FETCH:
            return {
                ...state,
                currentSelectedIndex: action.payload
            }
        default:
            return state
    }   
}

export {Index_Selection}