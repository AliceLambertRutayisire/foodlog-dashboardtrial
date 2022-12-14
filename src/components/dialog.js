import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add meal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add your meal /water/ beverage information below
          </DialogContentText>
          <form>
               <TextField id="breakfast" value={breakfast} onChange={e=>onChange(e)} placeholder="Breakfast details" label="Breakfast" variant="outlined" margin="dense" fullWidth />
               <TextField id="lunch" value={lunch} onChange={e=>onChange(e)} placeholder="Lunch details" label="Lunch" variant="outlined" margin="dense" fullWidth />
               <TextField id="dinner" value={dinner} onChange={e=>onChange(e)} placeholder="Dinner details" label="Dinner" variant="outlined" margin="dense" fullWidth />
               <TextField id="snacks" value={snacks} onChange={e=>onChange(e)} placeholder="Snacks details" label="Snacks" variant="outlined" margin="dense" fullWidth />
               <TextField id="date" value={Date} onChange={e=>onChange(e)} placeholder="Enter Date of today" label="Date" variant="outlined" margin="dense" fullWidth />
           </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
              {id?"Update":"Submit"}
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}