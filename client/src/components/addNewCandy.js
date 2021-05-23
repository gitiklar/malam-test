import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form , Button, Input, Modal, Upload } from 'antd';
import { CheckOutlined, UploadOutlined } from '@ant-design/icons';

import { addNewCandy } from '../redux/actions';
import { useHistory } from 'react-router';

import useIndicationMessage from '../customHooks/useIndicationMessage';

const AddNewCandy = ({ isVisible , setIsVisible }) => {
    const [ key , setKey ] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useIndicationMessage();

    const handleOk = newCandyFormData =>  {
        const allFormData = new FormData();
        allFormData.append('candyName' ,newCandyFormData.candyName);
        allFormData.append('price' ,newCandyFormData.price);       
        allFormData.append('image', newCandyFormData.upload[0].originFileObj);
        dispatch(addNewCandy( allFormData , visibleFalse , setKey , history));
    }

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
          }
        
          return e && e.fileList;
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
                    <Form.Item name="upload" rules={[{ required: true, message: 'Please upload an image!',}]}  valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddNewCandy;