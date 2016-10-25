import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import reducer from './reducers'
import { createStore } from 'redux'
import App from './components/App'
import './styles/index.css'

const store = createStore(reducer)
const router = (
	<Provider store={store}>
    <App />
  </Provider>
);

render(router, document.getElementById('root'))
