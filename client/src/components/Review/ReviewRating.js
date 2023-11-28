import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material'

const ReviewRating = (props) => {

  const title = "Choose a rating";

  const handleMovieChange = (event) => { //sets new value and resets error condition
    props.setSelectedRating(event.target.value)
    props.setError((prevError) => ({
      ...prevError,
      selectedRating_error: false, 
    }));
  }
  //states declarations
  //constants and functions declarations

  return (
    <div className='rating'>
    <h2 style={{ fontSize: 20}} >{title}</h2>
    <FormControl>
      <FormLabel>Rating</FormLabel>
      <RadioGroup row onChange={handleMovieChange} value = {props.selectedRating}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    </FormControl >
    </div>
  );
}

export default ReviewRating;