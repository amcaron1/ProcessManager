import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import processes from './modules/processes'
import responses from './modules/responses'
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'

// handleAsync handles dispatch calls that interrupt the flow of control
// handleAsync is a variable that gets set to an anonymous function
// the const line declares 3 ananymouns functions
// The first one has a argument of stooreAPI and returns a function
// The second one has an argument of next and returns a function
// The thrid one has an arguemnt of action
// If action is a function, it is returned with dispatch and getState
//   as paramaters.  This is how the sideEffect function in
//   initiateLogin gets its arguments
// What happens after that ???
// if action is not a function (for example a state update),
//   that action is the next task executed, and then normal flow
//   of control continues

const handleAsync = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)
    next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({processes, responses}),
    composeEnhancers(applyMiddleware(handleAsync))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
    // </React.StrictMode>
);
