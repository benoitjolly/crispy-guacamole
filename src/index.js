import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import statsReducer from './reducers/statsReducer';
import statsDataReducer from './reducers/statsDataReducer';
import statsMonetizationReducer from './reducers/monetizationReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';



const reducer = combineReducers({
    errors: errorReducer,
    loading: loadingReducer,
    stats: statsReducer,
    statsData: statsDataReducer,
    statsMonetizationData: statsMonetizationReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk));




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

