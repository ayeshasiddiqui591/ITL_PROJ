import React, { useState, useEffect } from 'react';
import './App.css';
import image1 from './image2.png';
import image2 from './image5.png';
import image3 from './img3.png';
import { Card } from '@mui/material';

const images = [image1, image2, image3]; // Array of image paths

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <section id="about">
        <div className="about-container">
          <div className="image-container">
            <img
              src={images[currentImageIndex]}
              style={{ width: '100%' }}
              alt="Slideshow"
            />
          </div>
          <div className="text-container">
            <Card className="text-card">
              <h1 className="aboutmain-text">About Us</h1>
              <p>
                We're farewala we are about connecting you with the vibrant world of
                local vendors. Our website is designed to make your shopping
                experience easy and enjoyable, whether you're exploring bustling
                city streets or quaint suburban neighborhoods. With a keen focus
                on convenience and community, we strive to empower both customers
                and vendors alike. By providing a seamless way to discover local
                vendors and their unique offerings, we aim to support small
                businesses while bringing you closer to the heart of your community.
                Join us on this journey as we redefine the way you shop, one local
                vendor at a time.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
