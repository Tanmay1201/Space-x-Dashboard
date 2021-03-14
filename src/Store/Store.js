import RootReducer from "../Reducers/RootReducer"
import { createStore, applyMiddleware } from "redux"
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'

const Store = createStore(RootReducer, applyMiddleware(logger, ReduxThunk))

export default Store;