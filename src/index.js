import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import burgerreducer from './redux/reducers/burgerBuilder'
import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import order from './redux/reducers/orders'
import auth from './redux/reducers/auth'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose
const rootReducer = combineReducers({
    order: order,
    burgerprops: burgerreducer,
    auth: auth
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


const app = (
    <Provider store={store}>

        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
