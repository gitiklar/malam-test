import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Input } from 'antd';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

import { updateBuyingSummary } from '../redux/actions';
import klikImg from '../../styles/images/klik.jpg';
import Payment from './payment';
import useIndicationMessage from '../customHooks/useIndicationMessage';

const BuyOnline = () => {
    const dispatch = useDispatch();
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);
    const buyingSummary = useSelector(state => state.buyingSummaryReducer.buyingSummary);
    
    useIndicationMessage();

    const onChangeHandler = (id ,value) => {
        const newBuyingSummary = JSON.parse(JSON.stringify(buyingSummary));
        const indexOfCurrentCandy = buyingSummary.findIndex(candy=>candy.id === id);
        indexOfCurrentCandy === -1 && (newBuyingSummary.push({id , count: value}));
        indexOfCurrentCandy !== -1 && (newBuyingSummary[indexOfCurrentCandy].count = value);
        dispatch(updateBuyingSummary(newBuyingSummary));
    }

    return (
      <div className="buyOnlineContainer">
            <div className="topBuyOnlineContainer">
                <Payment/>
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
                                                    buyingSummary.find(el => el.id === candy._id) ? buyingSummary.find(el=>el.id === candy._id).count : null
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