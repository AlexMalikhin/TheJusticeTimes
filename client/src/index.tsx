import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppContextProvider } from './components/AppContext/AppContext'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
