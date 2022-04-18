import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { read, update } from '../actions';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];


export default function TableGrid() {

    const rows = useSelector(state => state);


    const dispatch = useDispatch();

    const selectorHanlder = (selection) => {
        console.log(selection);
    }
    
    const editHandler = (params) => {
        console.log(params);
        let response = axios.post('users/update', params);
        let newusers = response.data.users;
        dispatch(update(newusers));
    }

    useEffect(async () => {
        let response = await axios.get('/users');
        dispatch(read(response.data));
    }, [])
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                checkboxSelection={true}
                onSelectionModelChange={selectorHanlder}
                rows={rows}
                columns={columns}
                pageSize={5}
                onCellEditCommit={editHandler}
            />
        </div>
    );
}
