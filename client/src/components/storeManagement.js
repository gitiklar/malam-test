import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

import CandiesEditableTable from './candiesEditableTable';
import addCandyIcon from '../../styles/images/addCandyIcon.jpg';
import AddNewCandy from './addNewCandy';

const StoreManagement = () => {
    const [ isVisible , setIsVisible ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    //Handling permissions when refreshing a page
    //Check role after loaded from server - (user loaded by store when loading the site)
    useEffect(()=>{
        dispatch((dispatch  , getState) => {
            setTimeout(()=>{
                if(getState().userReducer.loggedInUserFormData.role !== 'admin') {
                    history.push("/home");
                }
            }, 200);
        })
    });

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