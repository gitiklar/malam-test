import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import 'antd/dist/antd.css';

const Statistics = () => {
    const role = useSelector(state => state.userReducer.loggedInUserFormData.role);
    if(role !== 'admin') return <Redirect to="/home"/>;

    return (
      <div className="innerContainer">
          Statistics
      </div>
    );
};

export default Statistics;