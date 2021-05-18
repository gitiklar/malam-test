import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { createNewUser } from '../redux/actions';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ registerUserFormData , setRegisterUserFormData ]= useState({});

  const indicationMessage = useSelector(state => state.userReducer.indicationMessage);   

  useEffect(()=> {
      if(!indicationMessage.message) return;
      indicationMessage.type === 'error' && message.error({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
      indicationMessage.type === 'info' && message.info({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
      indicationMessage.type === 'success' && message.success({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
  } , [indicationMessage.message]);

  const onInputHandler = (target) => {
    const newRegisterUserFormData = JSON.parse(JSON.stringify(registerUserFormData));
    newRegisterUserFormData[target.id] = target.value;
    setRegisterUserFormData(newRegisterUserFormData);
  }

  const onRegister = () => {
      message.loading({ content: '...שולח', key:indicationMessage.key });
      dispatch(createNewUser(registerUserFormData , history));
  }

  return (
    <div className="registerContainer">
      <div className="form-container">
              <Form onInput={(e)=>onInputHandler(e.target)} dir="ltr" className="form" onFinish={onRegister}>
                  <Form.Item name="username" rules={[{ required: true, message: 'Please enter username!',},]}>
                      <Input id="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
                  </Form.Item>
                  <Form.Item name="email" rules={[{ required: true, message: 'Please enter email!',}, 
                                                  {type: 'email', message: 'The input is not valid E-mail!',},]}>
                      <Input id="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: 'Please enter password!', 
                             min: 6, message: 'The password must be at least 6 characters long!', },]}>
                      <Input id="password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="password"/>
                  </Form.Item>
                  
                  <Form.Item name="confirm-password" rules={[{ required: true, message: 'Please confirm your password!', },
                      ({ getFieldValue }) => ({ validator(_, value) {
                         if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),]}>
                      <Input id="confirm-password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="confirm password"/>
                  </Form.Item>
                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="colorWhite">Register</Button>
                  </Form.Item>
              </Form>
          </div>
    </div>
  );
};

export default Register;