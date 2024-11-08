import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/database';
import './sidebar.css'; 

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

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const usersRef = ref(db, 'users'); 

const Sidebar = ({ children }) => {
  const [userArray, setUserArray] = useState([]);
  const category = localStorage.getItem('category');

  const addtofav = (user) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];   
    if (!favorites.some(fav => fav.id === user.id)) {
      favorites.push(user);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${user.name} is added to favourites`);
    }
  };
  

  useEffect(() => {
    // Listen for changes at the 'users' reference
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') {
        // Convert data object to array of users
        const users = Object.entries(data).map(([userId, userData]) => ({
          id: userId,
          ...userData
        }));

        // Filter users where value is "true" and productType matches category
        const filteredUsers = users.filter(user => user.value === "true");
        // Update state with filtered user array
        setUserArray(filteredUsers);
      }
    });

    // Clean up by unsubscribing when the component unmounts
    return () => {
      unsubscribe(); // Detach the listener
    };
  }, [category]); // Update effect when category changes

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {children}
        <h2>Vendors near you:</h2>
        {userArray.map((user, index) => {
          const matchingProducts = user.products && Object.values(user.products).filter(product => product.productType === category);

          if (matchingProducts.length > 0 ) {
            return (
              <div key={user.id} className="vendor-card">
                <h3>{user.name} {user.surname}</h3>
                <p>Phone: {user.phone}</p>
                <h4>Products:</h4>
                {matchingProducts.map(product => (
                  <ul key={product.id}>
                    <li>
                      <strong>Details:</strong> {product.details}<br />
                      <strong>Product Type:</strong> {product.productType}<br />
                      <strong>Quantity:</strong> {product.quantity}<br />
                    </li>
                  </ul>
                ))}
                <button id='btn1' onClick={() => addtofav(user)}>Add to favourites</button>
              </div>
            );
          } else {
            return null; 
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
