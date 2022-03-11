import { applyMiddleware, combineReducers, createStore } from 'redux'
import { articleReducer } from './reducers/articleReducer/articleReducer'
import { authReducer } from './reducers/userReducer/authReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  authReducer,
  articleReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
