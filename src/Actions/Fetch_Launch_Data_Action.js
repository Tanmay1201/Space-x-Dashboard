import { DATA_FETCH_FAILURE, DATA_FETCH_REQUEST, DATA_FETCH_SUCCESS } from "../Actions/ActionTypes"
import axios from  "axios"
export const dataFetchRequest = () => {
    return {
        type: DATA_FETCH_REQUEST,
    }
}

export const dataFetchSuccess = data => {
    return {
        type: DATA_FETCH_SUCCESS,
        payload: data
    }
}

export const dataFetchFailure = error => {
    return {
        type: DATA_FETCH_FAILURE,
        payload: error
    }
}

export const fetchData = () => {
    return (dispatch) => {
        dispatch(dataFetchRequest())
        axios.get('https://api.spacexdata.com/v3/launches')
        .then(response => {
            let data = response.data
            dispatch(dataFetchSuccess(data))
        })
            .catch(error => {
        let errors = error.message
            dispatch(dataFetchFailure(errors))
        })   
    }
}