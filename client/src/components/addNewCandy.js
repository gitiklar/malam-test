import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form , Button, Input, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { addNewCandy } from '../redux/actions';
import { useHistory } from 'react-router';

import useIndicationMessage from '../customHooks/useIndicationMessage';

const AddNewCandy = ({ isVisible , setIsVisible }) => {
    const [ key , setKey ] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useIndicationMessage();

    const handleOk = newCandyFormData =>  {
        dispatch(addNewCandy(newCandyFormData , visibleFalse , setKey , history));
    }
    
    const visibleFalse = () => setIsVisible(false);

    return (
        <div className="newCandyContainer">
            <Modal visible={isVisible} title="Add new candy" onCancel={visibleFalse} footer={[
                <Button form="newCandyForm" key="submit" type="primary" htmlType="submit"> Add </Button>,
                <Button key="back" onClick={visibleFalse}> Return </Button>,]}
            >

                <Form id="newCandyForm" onFinish={handleOk} key={key} name="basic">
                    <Form.Item name="candyName" rules={[{ required: true, message: 'Please enter candy name!',},]}>
                        <Input prefix={<CheckOutlined className="site-form-item-icon" />} placeholder="candy name" />
                    </Form.Item>
                    <Form.Item name="price" rules={[{ required: true, message: 'Please enter candy price!',},]}>
                        <Input prefix={<CheckOutlined />} data-address={true} type="number" placeholder="candy price"/>
                    </Form.Item>
                    <Form.Item name="image">
                        <Input prefix={<CheckOutlined />} data-address={true} placeholder="candy image"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddNewCandy;