import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const ReviewBody = (props) => {

  const title = "Body of Review";

  const handleMovieChange = (event) => { //sets new value and resets error condition
    props.setEnteredReview(event.target.value)
    props.setError((prevError) => ({
      ...prevError,
      enteredReview_error: false, 
    }));
  }
  //states declarations
  //constants and functions declarations

  return (
    <div className='review-body'>
    <h2 style={{ fontSize: 20 }}>{title}</h2>
    <TextField label="Body of Review" multiline rows={4} maxRows={10} inputProps = {{maxLength: 200}} fullWidth required onChange={handleMovieChange} value = {props.enteredReview}/>
    </div>
  );
}

export default ReviewBody;