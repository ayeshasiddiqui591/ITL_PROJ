import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/database'; 
import backgroundImage from './Background.png'; 
import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material';

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

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); 
}

const db = firebase.database(); 

export default function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('false'); // Added state for seller or not
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    const userData = {
      name,
      surname,
      phone,
      password,
      value // whether user is a seller or not
    };

    db.ref('users').push(userData)
      .then(() => {
        console.log('User added to Realtime Database');
        const redirectPath = value === 'true' ? '/signup1' : '/';
        navigate(redirectPath);
      })
      .catch((error) => {
        console.error('Error adding user to Realtime Database:', error);
        alert('Error creating user account: ' + error.message);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
    >
      <Card>
        <CardContent>
          <LockPersonIcon />
          <Typography variant="h2" component="div">
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #need to write some text
          </Typography>
          <br />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            autoComplete="true"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
            required
          />
          <TextField
            id="surname"
            label="Surname"
            variant="outlined"
            size="small"
            autoComplete="true"
            autoFocus
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
            required
          />
          <TextField
            id="phoneno"
            label="Phone number"
            variant="outlined"
            size="small"
            autoComplete="true"
            autoFocus
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            autoComplete="true"
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
            required
          />
          <FormControl sx={{ width: '100%', marginBottom: 2, display: 'flex', justifyContent: 'center' }} required>
            <FormLabel id="sellerornot" sx={{ marginLeft: 0, fontSize: '1.2rem' }}>Are you a Seller or not</FormLabel>
            <RadioGroup
              row
              aria-labelledby="sellerornot"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
                sx={{align:'center'}}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
