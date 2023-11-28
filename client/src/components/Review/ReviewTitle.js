import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const ReviewTitle = (props) => {

  const title = "Title of Review";

  const handleMovieChange = (event) => { //sets new value and resets error condition
  props.setEnteredTitle(event.target.value)
  props.setError((prevError) => ({
    ...prevError,
    enteredTitle_error: false, 
  }));
}
  //states declarations
  //constants and functions declarations

  return (
    <div className='review-title'>
    <h2 style={{ fontSize: 20 }}>{title}</h2>
    <TextField label="Title of Review" variant="outlined" fullWidth required onChange={handleMovieChange} value={props.enteredTitle}/>
    </div>
  );
}

export default ReviewTitle;