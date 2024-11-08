import React, { useState } from 'react'; // Import useState for state management
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Typography from '@material-ui/core/Typography';
import { Drawer } from '@material-ui/core';
import Favorite from './favourite'; 
import Profile from './profile';
import TitlebarImageList from './category';
import LogoutIcon from '@mui/icons-material/Logout';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

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
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
}));

const Dashboard = () => {
  const navigate=useNavigate();
  const classes = useStyles();
  const [currentContent, setCurrentContent] = useState('profile'); // Set initial content to 'home'
  const handleClickAccount = () => {
    setCurrentContent('profile');
  };
  const handleClickCategory = () => {
    setCurrentContent('category');
  };
  const handleClickFavorites = () => {
    setCurrentContent('favorites');
  };
  const logout=()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).then(() => {
      console.log('Location updated successfully.');
      navigate('/');
    }).catch((error) => {
      console.error('Error updating location:', error);
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
            <ListItem button onClick={handleClickFavorites}>
              <ListItemIcon><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>
            
            <ListItem button onClick={handleClickCategory}>
              <ListItemIcon><LocalOfferIcon /></ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon><LogoutIcon/></ListItemIcon>
              <ListItemText primary="Log out" />
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
        {currentContent === 'favorites' && <Favorite />}
        {currentContent === 'category' && <TitlebarImageList />}
        
  

        {/* Optionally add cards for other content sections */}
      </main>
    </div>
  );
};

export default Dashboard;
