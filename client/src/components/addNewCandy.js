import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Form , Button, Input, Modal } from 'antd';
import { UserOutlined, WalletOutlined } from '@ant-design/icons';

//import { saveNewCategory, validateUniqueFieldInAnArray } from '../redux/actions';
//import useTitle from '../customHooks/useTitle';

const AddNewCandy = ({ isVisible , setIsVisible }) => {
    
    const handleOk = () => visibleFalse();
    const visibleFalse = () => setIsVisible(false);

    return (
        <div className="newCandyContainer">
            <Modal visible={isVisible} title="Add new candy" onCancel={visibleFalse} footer={[
                <Button form="newCandyForm" key="submit" type="primary" htmlType="submit"> Add </Button>,
                <Button key="back" onClick={visibleFalse}> Return </Button>,]}
            >

                <Form id="newCandyForm" onFinish={handleOk}  onInput={(e)=>onInputHandler(e.target.value)} name="basic">
                    <Form.Item name="Candy name" rules={[{ required: true, message: 'Please enter candy name!',},]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="candy name" />
                    </Form.Item>
                    <Form.Item name="Price" rules={[{ required: true, message: 'Please enter candy price!',},]}>
                        <Input prefix={<WalletOutlined/>} data-address={true} type="number" placeholder="candy price"/>
                    </Form.Item>
                    <Form.Item name="Image">
                        <Input prefix={<WalletOutlined/>} data-address={true} placeholder="candy image"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddNewCandy;