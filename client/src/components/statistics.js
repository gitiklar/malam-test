import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import 'antd/dist/antd.css';

import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const Statistics = () => {
    const role = useSelector(state => state.userReducer.loggedInUserFormData.role);
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);
    if(role !== 'admin') return <Redirect to="/home"/>;

    const categoryArray = candiesArray.map(candy=>({ label: candy.candyName}));
    const dataSetArray = candiesArray.map(candy=>({ value: candy.count}));
    const dataSource = { 
        categories: [{category: categoryArray}],
        dataset: [{data: dataSetArray},]
    };
      
    return (
      <div className="statisticContainer">
           <ReactFusioncharts type="mscolumn3d" width="80%" height="70%" dataFormat="JSON" dataSource={dataSource}/>
      </div>
    );
};

export default Statistics;