import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { LockOpenOutlined } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Update the import statement to use 'compat' for compatibility mode
import 'firebase/compat/auth'; // Import the auth module
import 'firebase/compat/database'; // Import the Realtime Database module

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDM-SSjSjDzaYDBn1x1PJR0oi4Q5e_Dcnc",
  authDomain: "farewala-569aa.firebaseapp.com",
  databaseURL: "https://farewala-569aa-default-rtdb.firebaseio.com",
  projectId: "farewala-569aa",
  storageBucket: "farewala-569aa.firebasestorage.app",
  messagingSenderId: "499790925683",
  appId: "1:499790925683:web:12da0e00ad9b9c8b87bf06",
  measurementId: "G-YRKVP16HML"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Login() {
  
  const paperStyle = { padding: 20, height: '500px', width: 600, margin: "20px auto"};
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = firebase.database().ref('users');
      const snapshot = await userRef.orderByChild('phone').equalTo(formData.username).once('value');
      const userData = snapshot.val();
      if (userData) {
        const userId = Object.keys(userData)[0];
        const user = userData[userId];
        if (user.password === formData.password) {
          localStorage.setItem('phone', formData.username);
          if (user.value === 'true') {
            navigate('/dashboardvendor');
          } else {
            navigate('/dashboard');
          }
        } else {
          console.log('Incorrect password');
        }
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.log('An error occurred. Please try again.', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Avatar style={avatarStyle}><LockOpenOutlined /></Avatar>
          <Typography variant="h5">Login</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField 
            label='Phone Number' 
            placeholder='Enter phone number' 
            fullWidth 
            required 
            margin="normal" 
            autoComplete='true'
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField 
            label='Password' 
            placeholder='Enter password' 
            type='password' 
            fullWidth 
            required 
            margin="normal" 
            autoComplete='true' 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
          <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>
            Sign in
          </Button>
        </form>
        <Typography>
          <Link href="#">
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          Do you have an account?
          <RouterLink to="/signup">
            Sign Up
          </RouterLink>
        </Typography>
      </Paper>
    </Grid>
  );
}
