import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { create, read, remove, update } from '../actions';
import { Button } from '@mui/material';
import AddDialog from './AddDialog';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
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

    //for dispatching actions
    const dispatch = useDispatch();

    //first time get the data
    const rows = useSelector(state => state);

    //selector for checkbox
    const [selection, setSelection] = useState([]);

    //for dialog open and close
    const [open, setOpen] = useState(false);

    //to Add a user
    const [user, setUser] = useState({ firstName: '', lastName: '', age: 0 });



    //capture or update user data === ADD USER
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    //for checkbox  changes
    const selectorHanlder = (selection) => {
        setSelection(selection);
    }

    //For opening Dialog box of USER ADD
    const AddHandler = () => {
        setOpen(true);

    }

    //TO ADD USER INTO THE BACKEND USING AXIOS AND DISPATCH ACTION CREATE
    const handleClose = async (add) => {
        if (add) {
            let response = await axios.post('/users/insert', { user });
            if (response.data.insert) {
                window.alert("user Added Successfully");
                dispatch(create({ user: response.data.user })); //getting new user with unique id
            }
        }
        setOpen(false);
        //set default values
        setUser({ firstName: '', lastName: '', age: 0 });

    }

    //TO DELETE USER
    const deleteHandler = async () => {
        const response = await axios.post('/users/delete', { id: selection });
        if (response.data.success) {
            let newusers = response.data.users;
            dispatch(remove(newusers));
        }
    }

    //TO UPDATE USER
    const editHandler = async (params) => {
        let response = await axios.post('users/update', params);
        let newusers = response.data.users;
        dispatch(update({ users: newusers }));
    }

    //TO CAPTURE THE UPDATES
    useEffect(async () => {
        let response = await axios.get('/users');
        dispatch(read(response.data));
    }, [])


    return (
        <div style={{ height: 400, width: '100%' }}>
            <div>
                <Button onClick={deleteHandler}>Delete</Button>
                <Button onClick={AddHandler}>Add</Button>
            </div>
            <AddDialog open={open} handleClose={handleClose} user={user} changeHandler={changeHandler} />
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
