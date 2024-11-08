import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Background from './Background.png';

export default function VendorImage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/tab');
    };

    return (
        <div className="vendor-container">
            <img src={Background} className='background-image' alt='Street background' />
            <div className="overlay"></div>
            <div className="content">
                <h1 className="main-text">WELCOME TO FAR-E-WALA</h1>
                <p className="sub-text">
                   <h3>Shop smart, Shop Local</h3> 
                   Discover street vendors near you
                Find Mobile Vendors Nearby and Rediscover Your Neighborhood's Charm!
                <div>
                <button className='started1' onClick={handleClick} style={{marginLeft:280}}>Get Started</button>
                </div>
                </p>
               </div>

        </div>
    );
}
