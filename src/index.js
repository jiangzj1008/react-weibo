import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// 引入 reducer
import reducer from './reducer/todos'

// 引入静态资源
import './style/index.css'

// 引入程序
import App from './container';

const store = createStore(reducer)
const rootEl = document.querySelector('#root')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
);
