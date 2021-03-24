import {DATE_FILTER_MODAL} from  '../Actions/ActionTypes'
const initialState = {
    isModalOpen : false
}

const Date_Filter_Modal = (state = initialState, action) => {
    switch (action.type) {
        case DATE_FILTER_MODAL:
            return {
                ...state,
                isModalOpen: action.payload
            }
        default:
            return state
    }   
}

export {Date_Filter_Modal}