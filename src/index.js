import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// import { BrowserRouter as Router, Route } from 'react-router-dom';

import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import statsReducer from './reducers/statsReducer';
import statsDataReducer from './reducers/statsDataReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';



const reducer = combineReducers({
    errors: errorReducer,
    loading: loadingReducer,
    stats: statsReducer,
    statsData: statsDataReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk));




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

