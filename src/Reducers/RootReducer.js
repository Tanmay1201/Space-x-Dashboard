import {Fetch_Launch_Data} from "./Fetch_Launch_Data_Reducer"
import {combineReducers} from "redux"

const RootReducer = combineReducers({
    FetchLaunchData: Fetch_Launch_Data
})

export default RootReducer;