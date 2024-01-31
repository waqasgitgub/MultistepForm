// CommonSnackbar.js
import { Snackbar } from '@mui/material';
import React from 'react';
import MuiAlert from "@mui/material/Alert";


const CommonSnackbar = ({ open, message, severity, handleClose, autoHideDuration }) => {
  return (
    <Snackbar open={open} 
    autoHideDuration={autoHideDuration} 
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    onClose={handleClose}
    
    >
      <MuiAlert elevation={6} variant="filled" severity={severity} onClose={handleClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CommonSnackbar;
