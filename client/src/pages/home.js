import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

import { updateLoggedInUserFormData } from '../redux/actions';

const Home = () => {
    const dispatch = useDispatch();
    const { username , role } = useSelector(state => state.userReducer.loggedInUserFormData);
    const indicationMessage = useSelector(state => state.userReducer.indicationMessage);   
    useEffect(() => message.destroy(indicationMessage.key) ,[]);  

    const logout = () => {
        localStorage.removeItem('loggedInUserFormData');
        dispatch(updateLoggedInUserFormData({ username: 'guest', role: 'guest' }));
    }

    return (
        <div className="homeContainer">
            <header id="header">
                 <div className="divHello">
                    <span> &nbsp; &nbsp; Hello { username } &nbsp; &nbsp;</span>
                    { role === 'guest' &&  <Link to="/login"><u>Login</u></Link> }
                    { role !== 'guest' &&  <Button onClick={logout}><u>Logout</u></Button> }
                 </div>
                 <img src="../../styles/images/logo.jpg"></img>
            </header>
            <div id="heading" >
                <div className="menuLine">
                
                </div>
            </div>
            <section id="main" className="wrapper">
                <div className="inner">
                    
                </div>
            </section>
        </div>
    );
};

export default Home;