import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form , Button, Input, Modal, Tooltip } from 'antd';
import { UserAddOutlined , IdcardOutlined , CreditCardOutlined , ContactsOutlined  , ShoppingCartOutlined } from '@ant-design/icons';
import { indicationMessageHandler , updateCandiesCountByOrder } from '../redux/actions';
import { useHistory } from 'react-router';

import useIndicationMessage from '../customHooks/useIndicationMessage';

const Payment = () => {
    const [ isVisible , setIsVisible ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const buyingSummary = useSelector(state => state.buyingSummaryReducer.buyingSummary);   
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);
    const role = useSelector(state => state.userReducer.loggedInUserFormData.role);
    let paymentCalc = 0;

    if(buyingSummary.length) {
         paymentCalc = buyingSummary.reduce((p , n) =>  p + candiesArray.find(candy=>candy._id === n.id).price * n.count , 0);
    }
   
    useIndicationMessage();

    const handleOk = () =>  {
        dispatch(updateCandiesCountByOrder(buyingSummary , history));
        visibleFalse();
    }
    
    const visibleFalse = () => setIsVisible(false);

    const forPaymentHandler = () => {
        if(!buyingSummary.length) {
            dispatch(indicationMessageHandler('info', 'You must buy at least one candy!'));
            setTimeout(()=>dispatch(indicationMessageHandler('', '')));
        } else {
            if(role === 'guest') {
                history.push('/login', { backToBuyOnline: true });
            } else {
                setIsVisible(true);
            }
        }
    }

    return (
        <div className="paymentContainer">
            <Tooltip placement="top" title="For payment">
                <button onClick={forPaymentHandler}><ShoppingCartOutlined/></button>
            </Tooltip>
            <Modal visible={isVisible} title="Payment" onCancel={visibleFalse} footer={[
                <Button form="paymentForm" key="submit" type="primary" htmlType="submit"> Order completion </Button>,
                <Button key="back" onClick={visibleFalse}> Return </Button>,]}
            >

                <Form id="paymentForm" onFinish={handleOk} name="basic">
                    <Form.Item>
                        <Input prefix={<UserAddOutlined />} placeholder="name" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<IdcardOutlined />} placeholder="card number" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<ContactsOutlined />} placeholder="expiration date" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<CreditCardOutlined/>} placeholder="cvv"/>
                    </Form.Item>
                    <div className="paymentDiv">{`Total: ${paymentCalc}$`}</div>
                </Form>
            </Modal>
        </div>
    );
}

export default Payment;