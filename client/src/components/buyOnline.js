import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Divider, Input, message, Tooltip } from 'antd';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

import { indicationMessageHandler , updateBuyingSummary } from '../redux/actions';
import klikImg from '../../styles/images/klik.jpg';
import Payment from './payment';

const BuyOnline = () => {
    const [ isVisible , setIsVisible ] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const indicationMessage = useSelector(state => state.userReducer.indicationMessage);   
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);
    const role = useSelector(state => state.userReducer.loggedInUserFormData.role);
    const buyingSummary = useSelector(state => state.buyingSummaryReducer.buyingSummary);

    useEffect(()=> {
        if(!indicationMessage.message) return;
        indicationMessage.type === 'info' && message.info({ content: indicationMessage.message, key:indicationMessage.key, duration: 3 });
    } , [indicationMessage.message]);
    
    const onChangeHandler = (id ,value) => {
        const newBuyingSummary = JSON.parse(JSON.stringify(buyingSummary));
        const indexOfCurrentCandy = buyingSummary.findIndex(candy=>candy.id === id);
        indexOfCurrentCandy !== -1 && (newBuyingSummary[indexOfCurrentCandy].count = value);
        indexOfCurrentCandy === -1 && (newBuyingSummary.push({id , count: value}));
        dispatch(updateBuyingSummary(newBuyingSummary));
    }

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
      <div className="buyOnlineContainer">
            <div className="topBuyOnlineContainer">
                    <Tooltip placement="top" title="For payment">
                        <Payment forPaymentHandler={forPaymentHandler} isVisible = {isVisible} setIsVisible = {setIsVisible}/>
                    </Tooltip>
            </div>
            <div className="buyOnlineGalery">
                {
                    <Row>
                        {
                             candiesArray.map(candy => { 
                                 return <Col key={candy._id} span={4} >
                                            <img src={klikImg}></img>
                                            <Divider/>
                                            <div className="priceInputContainer">
                                                <div>{`${candy.price}$`}</div>
                                                <Input type="number" min={0} value = {
                                                    buyingSummary.find(el=>el.id === candy._id) ? buyingSummary.find(el=>el.id === candy._id).count : null
                                                } 
                                                onChange={(e)=>onChangeHandler(candy._id , e.target.value)}/>
                                                <span>Pcs</span>
                                            </div>
                                            <div>{candy.candyName}</div>
                                        </Col>
                                }
                            )                            
                        }
                    </Row>
                }
            </div>
      </div>
    );
};

export default BuyOnline;