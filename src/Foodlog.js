import React , {useState, useEffect} from 'react'
import './App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Grid, Button} from '@mui/material';
//import FormDialog from './components/dialog';

const initialValue = {id: "", breakfast:"", lunch:"", dinner:"", snack:"", date:""}

function FoodLog ()  {
  const[gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };

  const url = 'http://localhost:3001/foodlog'
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Breakfast", field: "breakfast" },
    { headerName: "Lunch", field: "lunch", },
    { headerName: "Dinner", field: "dinner", },
    { headerName: "Snack", field: "snack" },
    { headerName: "Water/Beverage", field: "water/beverage" },
    {
      headerName: "Date", field: "id", cellRendererFramework: (params) => <div>
      <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Update</Button>
      <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Delete</Button>
    </div> 
    }
  ]
  useEffect(() => {
    getUsers()
  }, [])

  //fetching user data from server
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const onGridReady = (params) => {
    setGridApi(params)
  }

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }
  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true
  }
  return (
    <div className="App">
      <h1 align="center">Food log</h1>
      <h3>View your meal information</h3>
      <Grid align="right">
         <Button variant="contained" color="primary" onClick={handleClickOpen}>add meal</Button> 
      </Grid>
      <div className="ag-theme-alpine" style={{ height: '400px', width:
    '800px' }} align= "centre">
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      {/* <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} /> */}
    </div>
  );
}


export default FoodLog