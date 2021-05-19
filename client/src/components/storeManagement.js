import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

import CandiesEditableTable from './candiesEditableTable';
import addCandyIcon from '../../styles/images/addCandyIcon.jpg';
import AddNewCandy from './addNewCandy';

const StoreManagement = () => {
    const [ isVisible , setIsVisible ] = useState(false);
    const role = useSelector(state => state.userReducer.loggedInUserFormData.role);
    if(role !== 'admin') return <Redirect to="/home"/>;

    return (
      <div className="innerContainer">
          <div className="topCandiesEditableTable">
                <Tooltip placement="top" title="Add candy">
                    <img src={addCandyIcon} style={{width:'30px'}} onClick={()=>setIsVisible(true)}></img>
                </Tooltip>
          </div>
          <CandiesEditableTable/>
          <AddNewCandy isVisible={isVisible} setIsVisible={setIsVisible}/>
      </div>
    );
};

export default StoreManagement;