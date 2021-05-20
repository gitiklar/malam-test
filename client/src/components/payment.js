import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form , Button, Input, Modal, message } from 'antd';
import { UserAddOutlined , IdcardOutlined , CreditCardOutlined , ContactsOutlined  , ShoppingCartOutlined} from '@ant-design/icons';
import { clearBuyingSummary, updateCandiesCountByOrder } from '../redux/actions';

const Payment = ({ isVisible , setIsVisible ,forPaymentHandler }) => {
    const dispatch = useDispatch();
    const indicationMessage = useSelector(state => state.userReducer.indicationMessage);   
    const buyingSummary = useSelector(state => state.buyingSummaryReducer.buyingSummary);   
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);
    let paymentCalc;

    if(buyingSummary.length) {
         paymentCalc = buyingSummary.reduce((p , n) =>  p + candiesArray.find(candy=>candy._id === n.id).price * n.count , 0);
    }
   
    useEffect(()=> {
        if(!indicationMessage.message) return;
        indicationMessage.type === 'error' && message.error({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
        indicationMessage.type === 'info' && message.info({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
        indicationMessage.type === 'success' && message.success({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
    } , [indicationMessage.message]);

    const handleOk = () =>  {
        dispatch(updateCandiesCountByOrder(buyingSummary));
        visibleFalse();
    }
    
    const visibleFalse = () => setIsVisible(false);

    return (
        <div className="paymentContainer">
            <button onClick={forPaymentHandler}><ShoppingCartOutlined/></button>
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
                    <Form.Item>
                        <Input prefix={<CreditCardOutlined/>} placeholder="payment" value={paymentCalc}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Payment;