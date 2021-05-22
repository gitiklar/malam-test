import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import Entry from './pages/entry';
import store from './redux/store';
import '../styles/main.scss';

const App = () => {

    return (
        <Provider store={store}>
            <RouterApp/>
        </Provider>
    );
};

const RouterApp = () => {
    const allDataIsLoaded = useSelector(state=>state.isLoadReducer.allDataIsLoaded);
    return (
        <>
            { 
                allDataIsLoaded ? <Router>
                                        <Switch>
                                            <Route path="/register" component = {Register}/>
                                            <Route path="/login" component = {Login}/>
                                            <Route path="/home" component = {Home}/>
                                            <Route path="/" component = {Entry}/>
                                        </Switch>
                                    </Router> : <div>Loading...</div>
            }
        </>
    )
}

ReactDOM.render(<App/> , document.querySelector('main'));
