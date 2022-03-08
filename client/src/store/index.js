import {applyMiddleware, combineReducers, createStore} from "redux";
import {articleReducer} from "./reducers/articleReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    articleReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))