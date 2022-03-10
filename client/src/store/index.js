import { applyMiddleware, combineReducers, createStore } from 'redux';
import { articleReducer } from './reducers/articleReducer';
import { userReducer } from './reducers/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  articleReducer,
  userReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
