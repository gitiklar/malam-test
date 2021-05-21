import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import 'antd/dist/antd.css';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts"; charts(FusionCharts);
import ReactFusioncharts from "react-fusioncharts";

const Statistics = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);

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

    const categoryArray = candiesArray.map(candy => ({ label: candy.candyName}));
    const dataSetArray = candiesArray.map(candy => ({ value: candy.count}));
    const dataSource = { categories: [{category: categoryArray}], dataset: [{data: dataSetArray},]};
      
    return (
      <div className="statisticContainer">
           <ReactFusioncharts type="mscolumn3d" width="80%" height="70%" dataFormat="JSON" dataSource={dataSource}/>
      </div>
    );
};

export default Statistics;