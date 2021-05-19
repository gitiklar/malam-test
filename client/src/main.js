import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Entry from './pages/entry';
import Login from './pages/login';
import Home from './pages/home';

import store from './redux/store';
import '../styles/main.scss';
import Register from './pages/register';
import InventoryManagement from './components/inventoryManagement';

const App = () => {

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/register" component = {Register}/>
                    <Route path="/login" component = {Login}/>
                    <Route path="/home" component = {Home}/>
                    <Route path="/" component = {Entry}/>
                </Switch>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<App/> , document.querySelector('main'));
