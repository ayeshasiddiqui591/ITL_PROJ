import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, IconButton, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './Background.png'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/database'; 

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
export default function ProductForm() {
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  const productTypes = [
    { value: 'Vegetable', label: 'Vegetable' },
    { value: 'Fruit', label: 'Fruit' },
    { value: 'Street Food', label: 'Street Food' },
    { value: 'Sweets' , label: 'Sweets'},
  ];

  const handleAddProduct = () => {
    // Split input values by comma
    const productNameArray = productName.split(',');
    const priceArray = price.split(',');
    const quantityArray = quantity.split(',');

    // Iterate over each product entry
    productNameArray.forEach((productName, index) => {
      const trimmedProductName = productName.trim();
      const trimmedPrice = priceArray[index].trim();
      const trimmedQuantity = quantityArray[index].trim();

      // Check if a product with the same name already exists
      const existingProductIndex = products.findIndex((product) => {
        return product.details.split(' - ')[0].trim() === trimmedProductName;
      });

      // If a product with the same name exists, update its details
      if (existingProductIndex !== -1) {
        const updatedProducts = [...products];
        const existingProduct = updatedProducts[existingProductIndex];
        existingProduct.quantity = trimmedQuantity;
        existingProduct.details = `${trimmedProductName} - ${trimmedPrice}`;
        setProducts(updatedProducts);
      } else {
        // Otherwise, add a new product
        const details = `${trimmedProductName} - ${trimmedPrice}`;
        const newProduct = {
          productType,
          details,
          quantity: trimmedQuantity
        };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }
    });

    // Clear input fields
    setProductName('');
    setQuantity('');
    setPrice('');
    setProductType('');
  };

  const handleDeleteProduct = () => {
    const updatedProducts = [...products];
    updatedProducts.splice(deleteIndex, 1);
    setProducts(updatedProducts);
    setConfirmDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (products.length > 0) {
      console.log('Submitted Products:', products);

      // Get the phone number of the logged-in user from localStorage
      const phoneNumber = localStorage.getItem('phone');

      // Retrieve the user's data from the database based on the phone number
      db.ref('users').orderByChild('phone').equalTo(phoneNumber).once('value')
        .then((snapshot) => {
          // Check if the user exists
          if (snapshot.exists()) {
            // Get the user data
            const userData = snapshot.val();
            const userId = Object.keys(userData)[0];
            const user = userData[userId];

            // Check if the user is a vendor (value is "true")
            if (user.value === "true") {
              // Iterate over each product and store it in the database
              const promises = products.map((product) => {
                // Add the product to the "products" node in the database
                return db.ref('users').child(userId).child('products').push(product);
              });

              // Execute all promises concurrently
              Promise.all(promises)
                .then(() => {
                  console.log('Products stored in database successfully.');
                  navigate('/dashboardvendor');
                })
                .catch((error) => {
                  console.error('Error storing products in database:', error);
                });
            } else {
              // User is not a vendor
              alert('Only vendors can add products.');
            }
          } else {
            // User does not exist
            alert('User not found.');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user data:', error);
        });
    } else {
      alert('Please add at least one product');
    }
  };

  const backgroundHeight = 100 + 70 * products.length; // Adjust the height based on the number of products added

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${backgroundHeight}vh`, // Set height dynamically based on product count
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
            <Typography variant="h4" gutterBottom>
              Product Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                select
                label="Select Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {productTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Product Name (comma separated)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="text"
                label="Quantity (comma separated)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="text"
                label="Price (comma separated)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <IconButton aria-label="add" onClick={handleAddProduct}>
                Add Product
                <AddIcon />
              </IconButton>
              {products.map((product, index) => (
                <div key={index}>
                  <Typography variant="h6">Product {index + 1}</Typography>
                  <TextField
                    disabled
                    label="Product Type"
                    value={product.productType}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Product Name"
                    value={product.details.split(' - ')[0]}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Quantity"
                    value={product.quantity}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    label="Price"
                    value={product.details.split(' - ')[1]}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setDeleteIndex(index);
                      setConfirmDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
