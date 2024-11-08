import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import backgroundImage from './bg3.png';
import { Card, CardContent, Grid } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import firebase from 'firebase/compat/app'; // Update the import statement to use 'compat' for compatibility mode
import 'firebase/compat/auth'; // Import the auth module
import 'firebase/compat/database'; // Import the Realtime Database module
const db = firebase.database(); // Get a reference to the Firebase Realtime Database

const Profile = () => {
  const [userData, setUserData] = useState(null); // Define state variable for user data

  useEffect(() => {
    const phone = localStorage.getItem('phone');
    if (phone) {
      const userRef = db.ref('users');
      userRef.orderByChild('phone').equalTo(phone).once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const userId = Object.keys(userData)[0];
          const user = userData[userId];
          setUserData(user);
        } else {
          console.log('User data not found');
        }
      }, (error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const StyledBackgroundPaper = styled(Paper)(({ theme }) => ({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(2),
  }));

  return (
    <>
      {userData ? (
        <>
          <StyledBackgroundPaper>
            <Box py={20} />
          </StyledBackgroundPaper>
          <Box
            style={{
              position: 'relative',
              marginTop: '-60px',
              marginLeft: '200px',
              marginRight: '200px',
              zIndex: '1',
              padding: '20px', // Adjust padding here
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3}>
                  <Grid key={userData.id} item>
                    <Card variant="outlined" sx={{ width: 300, bgcolor: '#8B4513' }}> {/* Change bgcolor to brown */}
                      <CardContent>
                        <Box sx={{ textAlign: 'center', position: 'relative' }}>
                          <Avatar
                            alt="Profile Image"
                            src="/path_to_image.jpg"
                            style={{ width: '80px', height: '80px', margin: 'auto' }}
                          />
                          <Typography
                            sx={{
                              fontSize: 28,
                              textAlign: 'center',
                              width: '100%',
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Name: {userData.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 28,
                              textAlign: 'center',
                              width: '100%',
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Surname: {userData.surname}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 28,
                              textAlign: 'center',
                              width: '100%',
                            }}
                            color="text.secondary"
                          >
                            Phone: {userData.phone}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Loading user data...</Typography>
      )}
    </>
  );
}

export default Profile;
