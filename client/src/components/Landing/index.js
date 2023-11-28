import * as React from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Icon';
import Jaws from './Images/jaws.jpg';
import Fight from './Images/fight.jpg';
import Pulp from './Images/pulp.jpg';
import Alien from './Images/alien.jpg';
import Beast from './Images/beast.jpg';
import Die from './Images/die.jpg';
import Laser from './Images/laser.jpg';
import Mystic from './Images/mystic.jpg';
import Persona from './Images/persona.jpg';
import Santa from './Images/santa.jpg';


const Landing = () => {
  const moviePosters = [
    Jaws,
    Fight,
    Pulp,
    Alien,
    Beast
  ];

  const moviePosters2 = [
    Die,
    Laser,
    Mystic,
    Persona,
    Santa
  ];

  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar variant="dense">
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/')}>
                <Typography variant="h5" noWrap>
                  <strong>Landing</strong>
                </Typography>
              </Link>

              <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/Review')}>
                <Typography variant="h5" noWrap>
                  Review
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

      <Box sx={{ padding: '20px', textAlign: 'center', fontFamily: 'Comic Sans MS' }}>
        <Typography variant="h2" sx={{ color: 'black', marginBottom: '20px' }}>
        🎞️Welcome to Movie App🎞️
        </Typography>
        <Typography variant="h5" sx={{ color: 'rgb(23, 81, 126)' }}>
          Discover the latest movies, read reviews, and create your own watchlist.
        </Typography>
        <Typography variant="h5" sx={{ color: 'red' }}>
          Click on a movie and view the trailer👇
        </Typography>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <a href="https://www.youtube.com/watch?v=U1fu_sA7XhE" target="_blank" rel="noopener noreferrer">
          <img src={Jaws} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=LjLamj-b0I8" target="_blank" rel="noopener noreferrer">
        <img src={Alien} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=e3Nl_TCQXuw" target="_blank" rel="noopener noreferrer">
        <img src={Beast} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=jaJuwKCmJbY" target="_blank" rel="noopener noreferrer">
        <img src={Die} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=qtRKdVHc-cE" target="_blank" rel="noopener noreferrer">
        <img src={Fight} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <a href="https://www.youtube.com/watch?v=en_S142awYc" target="_blank" rel="noopener noreferrer">
          <img src={Laser} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=W7NktJhrRYQ" target="_blank" rel="noopener noreferrer">
        <img src={Mystic} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=amxvetvKfho" target="_blank" rel="noopener noreferrer">
        <img src={Persona} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=s7EdQ4FqbhY" target="_blank" rel="noopener noreferrer">
        <img src={Pulp} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
        <a href="https://www.youtube.com/watch?v=Bx8FX7etF_8" target="_blank" rel="noopener noreferrer">
        <img src={Santa} alt={`Movie Poster ${1}`} style={{ maxWidth: '300px', maxHeight: '400px' }}/>
        </a>
      </div>


      <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ color: 'rgb(23, 81, 126)', marginBottom: '20px' }}>
        Check out some of our currently trending movies and more
        </Typography>
        </Box>
    </div>
  );
};


export default Landing;