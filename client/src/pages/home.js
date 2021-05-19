import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import { Link, Route } from 'react-router-dom';

import { logout } from '../redux/actions';
import logoImg from '../../styles/images/logo.jpg';
import InventoryManagement from '../components/inventoryManagement';
import Statistics from '../components/statistics';

const AdministratorPrivileges = () => {
    return (
        <>
            <Link to="/home/inventory-management">Inventory management</Link>
            <Link to="/home/statistics">Statistics</Link>
        </>
    )
}

const Home = () => {
    const dispatch = useDispatch();
    const { username , role } = useSelector(state => state.userReducer.loggedInUserFormData);
    const indicationMessage = useSelector(state => state.userReducer.indicationMessage);   
    useEffect(() => message.destroy(indicationMessage.key) ,[]);  

    const logoutHandler = () => {
        localStorage.removeItem('loggedInUserFormData');
        dispatch(logout());
    }

    return (
        <div className="homeContainer">
            <header id="header">
                <Link to="/"><img src={logoImg} alt="logo"/></Link>
                 <div className="divHello">
                    <span> &nbsp; &nbsp; Hello { username } &nbsp;</span>
                    { role === 'guest' &&  <Link to="/login"><u>Login</u>&nbsp;&nbsp;</Link> }
                    { role !== 'guest' &&  <Button onClick={logoutHandler}><u>Logout</u></Button> }
                 </div>
            </header>
            <div id="heading" >
                <div className="menuLine">
                    <Link to="/home">Home</Link>
                    { role === 'admin' && <AdministratorPrivileges/> }
                </div>
            </div>
            <section id="main" className="wrapper">
                <div className="inner">
                <Route path="/home/inventory-management" component= {InventoryManagement}/>
                <Route path="/home/statistics" component= {Statistics}/>
                </div>
            </section>
        </div>
    );
};

export default Home;