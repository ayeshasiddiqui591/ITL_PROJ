import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import backgroundImage from './newbg.png';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent', // Set background color to transparent
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 600,
  color: theme.palette.text.primary,
}));

const StyledBackgroundPaper = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(2),
}));



export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const username = localStorage.getItem('username');
  useEffect(() => {
    // Get favorites data from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const numFavorites = favorites.length;

  return (
    <>
      <StyledBackgroundPaper>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </StyledBackgroundPaper>
      <br />
      <Typography variant="h4" gutterBottom>{username}'s Favorites ({numFavorites})</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {favorites.map((user) => (
            <StyledPaper key={user.id}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar><PermIdentityIcon /></Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">{user.name} {user.surname}</Typography>
                  <Typography variant="body2">Phone: {user.phone}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
