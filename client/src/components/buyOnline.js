import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { Row, Col, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const BuyOnline = () => {
    const [ isVisible , setIsVisible ] = useState(false);
    
    return (
      <div className="buyOnlineContainer" >
          <div className="topCandiesEditableTable">
                <Tooltip placement="top" title="For payment">
                    <button><ShoppingCartOutlined/></button>
                </Tooltip>
          </div>
          <>
            
            <Divider orientation="left">Align Bottom</Divider>
            <Row justify="space-between" align="center">
                    <Col span={4}>
                        <DemoBox value={100}>col-4</DemoBox>
                    </Col>
                    <Col span={4}>
                        <DemoBox value={50}>col-4</DemoBox>
                    </Col>
                    <Col span={4}>
                        <DemoBox value={120}>col-4</DemoBox>
                    </Col>
                    <Col span={4}>
                        <DemoBox value={80}>col-4</DemoBox>
                    </Col>
            </Row>
        </>
      </div>
    );
};

export default BuyOnline;