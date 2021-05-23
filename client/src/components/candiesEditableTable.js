import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Table, Popconfirm, Form, Typography } from 'antd';
import 'antd/dist/antd.css';

import EditableCell from './editableCell';
import { deleteCandyRow, deleteCandyRowFromServer, updateCandyRow } from '../redux/actions';

const CandiesEditableTable = () => {
    const [editingKey, setEditingKey] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const candiesArray = useSelector(state => state.candiesReducer.candiesArray);
    const originData = candiesArray.map(candyObj => { return {...candyObj , key:candyObj._id}});
    const [data, setData] = useState(originData);

    useEffect(() => {
        setData(originData);
    },[candiesArray]);

    const isEditing = record => record.key === editingKey;
    const cancel = () => { setEditingKey('');};
    const edit = record => {
        form.setFieldsValue({ candyName: '', price: '', image: '', ...record, }); 
        setEditingKey(record.key);
    };
    const save = async key => {
        try {
                const row = await form.validateFields();
                const newData = [...data];
                const index = newData.findIndex(item => key === item.key);
                const _id = newData[index]._id;
                dispatch(updateCandyRow(_id , row , history));
                setTimeout(()=>setEditingKey('') , 100);
            } 
            catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
    };
    
    const deleteCandyRowHandler = key => {
        const newData = [...data];
        const index = newData.findIndex(item => key === item.key);
        const _id = newData[index]._id;
        newData.splice(index, 1);
        setData(newData);
        dispatch(deleteCandyRow(index));
        dispatch(deleteCandyRowFromServer(_id , history));
    }

    const columns = [   {   title: 'candyName'      , dataIndex: 'candyName' ,  width: '30%' , editable: true, }, 
                        {   title: 'price'          , dataIndex: 'price'     ,  width: '30%' , editable: true, },
                        {   title: 'image'          , dataIndex: 'image'     ,  width: '30%' , editable: false, },
                        {   title: 'operation'      , dataIndex: 'operation' ,   
                            render: (_, record) => {
                                const editable = isEditing(record);                                                                               
                                return editable ? (
                                    <span>
                                        <a onClick={() => save(record.key)} style={{ marginRight: 8,}}>Save</a>
                                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                        <a>Cancel</a>
                                        </Popconfirm>
                                    </span>) : (
                                        <>
                                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit &nbsp;&nbsp;&nbsp;&nbsp;</Typography.Link>
                                            <Typography.Link disabled={editingKey !== ''} onClick={() => deleteCandyRowHandler(record.key)}>Delete</Typography.Link>
                                        </>
                                    );},},
                    ];

    const mergedColumns = columns.map(col => {
                if (!col.editable) { return col; }
                        return {
                                ...col, 
                                onCell: record => ({ record, inputType: (col.dataIndex === 'price' ) ? 'number' : 'text',
                                    dataIndex: col.dataIndex,
                                    title: col.title,
                                    editing: isEditing(record),
                            }),
                        }; 
                });
    return (
        <Form form={form} component={false}>
            <Table size="large" components={{body: {cell: EditableCell,},}} bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row" pagination={{ pageSize: 5 , onChange: cancel,}} />
        </Form>
    );
};
export default CandiesEditableTable;