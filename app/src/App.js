import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
    key: "root0", // name of the key for storing the data
    storage: storage // storage to use. defaults to Localstorage
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

function App() {
    return ( <
        Provider store = { store } >
        <
        PersistGate persistor = { persistor } >
        <
        Router history = { history } >
        <
        Routes / >
        <
        /Router> <
        /PersistGate> <
        /Provider>
    );
}

export default App;