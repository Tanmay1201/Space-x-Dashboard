import {INDEX_FETCH} from './ActionTypes'

export const indexfetch = data => {
    console.log('This is data'+ data)
    return {
        type: INDEX_FETCH,
        payload: data
    }
}
