import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProductForm from './signup1';
import Typography from '@material-ui/core/Typography';
import { Drawer } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Profile from './profile';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const db = firebase.database();
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    margin: 'auto', // Center horizontally
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Dashboardvendor = () => {
  const classes = useStyles();
  const [currentContent, setCurrentContent] = useState('profile'); // Set initial content to 'home'
  const navigate = useNavigate();
  const handleClickAccount = () => {
    setCurrentContent('profile');
  };

  const handleClickProduct = () => {
    setCurrentContent('signup1');
  };

  let interval; // Define interval variable outside useEffect

  useEffect(() => {
    const updateLocation = () => {
      const phone = localStorage.getItem('phone');
      console.log('Phone:', phone);
      if (phone) {
        const userRef = db.ref('users');
        userRef.orderByChild('phone').equalTo(phone).once('value', (snapshot) => {
          console.log('Snapshot:', snapshot.val());
          const userData = snapshot.val();
          if (userData) {
            const userId = Object.keys(userData)[0];
            console.log('User ID:', userId);
            navigator.geolocation.getCurrentPosition((position) => {
              console.log('Position:', position);
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log('Latitude:', latitude);
              console.log('Longitude:', longitude);
              // Update the location in the Realtime Database
              db.ref(`users/${userId}/location`).set({
                latitude: latitude,
                longitude: longitude
              }).then(() => {
                console.log('Location updated successfully.');
              }).catch((error) => {
                console.error('Error updating location:', error);
              });
            });
          }
        });
      }
    };

    interval = setInterval(updateLocation, 5000); // Update location every 5 seconds

    // Clean up function to clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount

  const logout = () => {
    // Clear the interval to stop updating location
    clearInterval(interval);

    firebase.auth().signOut().then(() => {
      const phone = localStorage.getItem('phone');
      if (phone) {
        const userRef = db.ref('users');
        userRef.orderByChild('phone').equalTo(phone).once('value', (snapshot) => {
          console.log('Snapshot:', snapshot.val());
          const userData = snapshot.val();
          if (userData) {
            const userId = Object.keys(userData)[0];
            console.log('User ID:', userId);
            // Set the user's location to null
            db.ref(`users/${userId}/location`).set({
              latitude: null,
              longitude: null
            }).then(() => {
              console.log('Location updated successfully.');
              navigate('/');
            }).catch((error) => {
              console.error('Error updating location:', error);
            });
          }
        });
      }

      console.log('User signed out successfully.');
      navigate('./');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <br></br>
          <br></br>
          <Avatar alt="Profile Image" src="/path_to_image.jpg" className={classes.avatar} />
          <List>
            <ListItem button onClick={handleClickAccount}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button onClick={handleClickProduct}>
              <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
              <ListItemText primary="Editing products" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><LocationOnIcon /></ListItemIcon>
              <ListItemText primary="Location On" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Conditionally render content based on currentContent state */}
        {currentContent === 'profile' && <Profile />}
        {currentContent === 'signup1' && <ProductForm />}

        {/* Optionally add cards for other content sections */}
      </main>
    </div>
  );
};

export default Dashboardvendor;
