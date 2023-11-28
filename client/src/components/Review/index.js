import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Grid, Box, Button, Container } from "@mui/material";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

const Review = () => {
  const title = "Review a movie"
  const [movies, setMovies] = React.useState(['Spider-Man: Across the Spider-Verse', 'The Flash', 'The Batman', 'Deadpool', 'Iron Man']);
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState(0);
  const [error, setError] = React.useState({
    selectMovie_error: false, 
    enteredTitle_error: false, 
    enteredReview_error: false, 
    selectedRating_error: false
  });
  const [finishedReview, setFinishedReview] = React.useState({
    movie: '',
    title: '',
    review: '',
    rating: 0
  });
  const [reviewCheck, setReviewCheck] = React.useState(false);
  const [allData, setAllData] = React.useState({});
  const [userID, setUserID] = React.useState(1);

  React.useEffect(() => {
    const callApiLoadMovies = async () => {
      const response = await fetch("/api/getMovies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAllData(data);
      let movieList = [];
      data.map((temp) => {
        movieList.push(temp.name);
      });
      setMovies(movieList);
    };    
    callApiLoadMovies();
  }, []);

  const findMovieID = () => {
    for(let i = 0; i<allData.length; i++){
      if(allData[i].name == selectedMovie){
        return allData[i].id;
      }
    }
  }
  

  const sendReviewApi = async () => {
    fetch("/api/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        movieID: findMovieID(),
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating
      })
    })
  }

  const submissionCheck = () => {
    if (selectedMovie == ''){
      setError((prevError) => ({
        ...prevError,
        selectMovie_error: true, 
      }));
    }

    if (enteredTitle == ''){
      setError((prevError) => ({
        ...prevError,
        enteredTitle_error: true, 
      }));
    }

    if (enteredReview == ''){
      setError((prevError) => ({
        ...prevError,
        enteredReview_error: true, 
      }));
    }

    if (selectedRating == 0){
      setError((prevError) => ({
        ...prevError,
        selectedRating_error: true,
      }));
    }
    //sets error to true if parts of the review are not filled in

    if(selectedMovie !== '' && enteredTitle !== '' && enteredReview !== '' && selectedRating !== 0){ //if everything is filled in
      setReviewCheck(true);
      setError((prevError) => ({
        ...prevError,
        selectMovie_error: false,
        enteredTitle_error: false, 
        enteredReview_error: false, 
        selectedRating_error: false, 
      })); //resets all error conditions
      setFinishedReview({ //sets the display variables
          movie: selectedMovie,
          title: enteredTitle,
          review: enteredReview,
          rating: selectedRating
        });
      sendReviewApi();
      formReset();
    }
  }

  const formReset = () =>{ //resets the whole form 
    setSelectedMovie('');
    setEnteredTitle('');
    setEnteredReview('');
    setSelectedRating(0);
  }

  //states declarations
  //constants and functions declarations

  const navigate = useNavigate();

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar variant="dense">
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/')}>
              <Typography variant="h5" noWrap>
                Landing
              </Typography>
            </Link>

            <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/Review')}>
              <Typography variant="h5" noWrap>
                <strong>Review</strong>
              </Typography>
            </Link>

            <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/Search')}>
              <Typography variant="h5" noWrap>
                Search
              </Typography>
            </Link>

            <Link color="inherit" style={{ cursor: "pointer", textDecoration: "none" }} onClick={() => navigate('/MyPage')}>
              <Typography variant="h5" noWrap>
                Watchlist
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
      
    <Container>
      <Grid container  >
        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12} >
          <Typography variant="h3" sx={{ color: 'rgb(23, 81, 126)' }}>{title}</Typography>
        </Grid>

        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
          <MovieSelection selectedMovie = {selectedMovie} setSelectedMovie = {setSelectedMovie} movies = {movies} selectMovie_error = {error.selectMovie_error} setError = {setError} />
          {error.selectMovie_error && <Typography variant="body2" color="red">Select a Movie</Typography>}
        </Grid>

        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
          <ReviewTitle enteredTitle = {enteredTitle} setEnteredTitle = {setEnteredTitle} enteredTitle_error = {error.enteredTitle_error} setError = {setError}/>
          {error.enteredTitle_error && <Typography variant="body2" color="red">Enter a Title</Typography>}
        </Grid>

        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
          <ReviewBody enteredReview = {enteredReview} setEnteredReview = {setEnteredReview} enteredReview_error = {error.enteredReview_error} setError = {setError}/>
          {error.enteredReview_error && <Typography variant="body2" color="red">Enter a Review</Typography>}
        </Grid>

        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
          <ReviewRating selectedRating = {selectedRating} setSelectedRating = {setSelectedRating} selectedRating_error = {error.selectedRating_error} setError = {setError}/>
          {error.selectedRating_error && <Typography variant="body2" color="red">Select a Rating</Typography>}
        </Grid>

        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
          <Button variant="outlined" onClick={submissionCheck}>Submit</Button>
        </Grid>

        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12} sx={{pt:2}}>
          {reviewCheck && <Typography>
            <>
            <Typography sx={{py:1}} color="green">Your review has been recieved</Typography>
            <Typography sx={{py:1}}>Movie: {finishedReview.movie}</Typography>
            <Typography sx={{py:1}}>Title: {finishedReview.title}</Typography>
            <Typography sx={{py:1}}>Review: {finishedReview.review}</Typography>
            <Typography sx={{py:1}}>Rating: {finishedReview.rating}</Typography>
            </>   
          </Typography>}
        </Grid>

      </Grid>

    </Container>

    </div>
  );
}

export default Review;