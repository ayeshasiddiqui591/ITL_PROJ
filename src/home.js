import React from 'react';
import Navbar from './Navbar';
import VendorImage from './image';
import SimpleBottomNavigation from './Bottomnav';
import About from './Aboutus';
import SpacingGrid from './lst';
export default function Home(){
    return(
    <>
        <Navbar/>
        <VendorImage/>
        <About/>
        <SimpleBottomNavigation/>

    </>
    );
}