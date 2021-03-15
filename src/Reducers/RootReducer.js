import { Fetch_Launch_Data } from "./Fetch_Launch_Data_Reducer"
import { Index_Selection} from './Index_Selection_Reducer'
import {combineReducers} from "redux"

const RootReducer = combineReducers({
    FetchLaunchData: Fetch_Launch_Data,
    IndexSelection: Index_Selection
})

export default RootReducer;