import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Sidebar from './sidebar';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/database';

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
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const usersRef = ref(db, 'users');

function Map() {
  const [vendorArray, setVendorArray] = useState([]);

  useEffect(() => {
    // Listen for changes at the 'users' reference
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') {
        // Convert data object to array of vendors with location
        const vendors = Object.values(data).map(user => {
          if (user.location) {
            return {
              latitude: user.location.latitude,
              longitude: user.location.longitude,
              ...user
            };
          }
          return null;
        }).filter(Boolean);

        // Update state with filtered vendor array
        setVendorArray(vendors);
        
      }
    });

    // Clean up by unsubscribing when the component unmounts
    return () => {
      unsubscribe(); // Detach the listener
    };
  }, []); // Run effect only once on component mount

  const geolocation = () => {
    document.getElementById('buttondisable').style.visibility = 'hidden';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  function success(position) {
    console.log("User position:", position);

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFuYXZpMTIzIiwiYSI6ImNsc3hjdjAzcTAxb3kycXAya3IyNnl3djgifQ.vyfIAPnhABA9sgvga4F6XA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 8
    });

    map.on('load', () => {
      const userMarker = new mapboxgl.Marker({ color: "black" });
      userMarker.setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);

      vendorArray.forEach((vendor) => {
        console.log("Vendor:", vendor);
        if (vendor.products && typeof vendor.products === 'object') {
          const dist = haversine(vendor.latitude, vendor.longitude, position.coords.latitude, position.coords.longitude);
          if (dist <= 10) {
            const popupContent = `
              <h3>${vendor.name} ${vendor.surname}</h3>
              <p>Phone: ${vendor.phone}</p>
              <h4>Products:</h4>
              <ul>
                ${Object.values(vendor.products).map(product => `
                  <li>
                    <strong>Details:</strong> ${product.details}<br />
                    <strong>Product Type:</strong> ${product.productType}<br />
                    <strong>Quantity:</strong> ${product.quantity}<br />
                  </li>
                `).join('')}
              </ul>
               `;

            const popup = new mapboxgl.Popup({ offset: 15 })
              .setHTML(popupContent);

            new mapboxgl.Marker({ color: "blue" })
              .setLngLat([vendor.longitude, vendor.latitude])
              .setPopup(popup)
              .addTo(map);
          }
        }
      });
    });
  }

  function error() {
    alert("Something went wrong");
  }

  // Function to calculate haversine distance
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  }

  // Function to convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  return (
    <>
      <button className="location-button" id='buttondisable' onClick={geolocation}>Get location</button>
      <div className="map-container">
        <div className="map" id="map"></div>
        <Sidebar />
      </div>
    </>
  );
}

export default Map;
