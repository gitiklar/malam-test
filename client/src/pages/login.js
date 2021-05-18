import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { login } from '../redux/actions';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ loginFormData , setLoginFormData ] = useState({});
    const indicationMessage = useSelector(state => state.userReducer.indicationMessage);   

    useEffect(()=> {
        if(!indicationMessage.message) return;
        indicationMessage.type === 'error' && message.error({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
    } , [indicationMessage.message]);

    const onLogin = () => {
        message.loading({ content: 'בבדיקה', key:indicationMessage.key });
        dispatch(login(loginFormData , history));
    };
    
    const onInputHandler = target => {
        const newLoginFormData = JSON.parse(JSON.stringify(loginFormData));
        newLoginFormData[target.id] = target.value;
        setLoginFormData(newLoginFormData);
    }

    return (
        <div className="loginContainer">
            <div className="form-container">
                <Form onInput={(e)=>onInputHandler(e.target)} dir="ltr" name="normal_login" className="form" onFinish={onLogin}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please enter email!',},]}>
                        <Input id="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please enter password!', },]}>
                        <Input id="password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="password"/>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register" className="register colorWhite"> Or register now!</Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="colorWhite">login</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
  );
};

export default Login;