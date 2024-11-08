import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import backgroundImage from './bg3.png';
import { Card, CardContent } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
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
          console.log('User data found:', user);
          localStorage.setItem('username', user.name);
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
              marginTop: '-150px',
              marginLeft: '200px',
              marginRight: '200px',
              zIndex: '1',
              padding: '15px', // Adjust padding here
            }}
          >
            <Card variant="outlined" sx={{ minHeight: '300px', bgcolor: '#C4A484' }}> {/* Adjust minHeight here */}
              <CardContent>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Avatar
                  
                    style={{ width: '80px', height: '80px', margin: 'auto' }}
                  >
                    <PersonIcon />
                    </Avatar>
                  <br></br>
                  <Typography
                    sx={{
                      fontSize: 28,
                      textAlign: 'center',
                      position: 'absolute',
                      top: '85px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100%',
                      
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Name : {userData.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 28,
                      textAlign: 'center',
                      position: 'absolute',
                      top: '130px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100%',
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Surname : {userData.surname}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 28,
                      textAlign: 'center',
                      position: 'absolute',
                      bottom: '-50px',
                      top: '170px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100%',
                    }}
                    color="text.secondary"
                  >
                    Phone: {userData.phone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Loading user data...</Typography>
      )}
    </>
  );
}

export default Profile;