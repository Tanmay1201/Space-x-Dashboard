import RootReducer from "../Reducers/RootReducer"
import { createStore, applyMiddleware } from "redux"
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

const Store = createStore(RootReducer,  composeWithDevTools(applyMiddleware(logger, ReduxThunk)))

export default Store;