import React from 'react'
import PropTypes from 'prop-types'
import './App.css'




export default function Navbar(props) {
  return (
    <div>
    <nav className="navbar bg-body" style={{backgroundColor:"black"}} >
    <div className="container-fluid text-centre translate-middle " >
        <h1 className="navbar-brand top-50 start-50 translate-middle" style={{color:"#FAF1CF"}} ><a style={{color:"inherit",textDecoration:"none"}}href="#about">About us</a></h1>
        <h1 className="navbar-brand top-50 start-50 translate-middle" style={{color:"#FAF1CF",fontSize:"30px",fontFamily:"initial"}}>FAR-e-WALA</h1>
        <h1 className="navbar-brand top-50 start-50 translate-middle" style={{color:"#FAF1CF"}} ><a style={{color:"inherit",textDecoration:"none"}}href="#contact">Contact Us</a></h1>
    </div>
   </nav>
   </div>
     
  );
}

Navbar.propTypes={title:PropTypes.string.isRequired,
              aboutText:PropTypes.string}

Navbar.defaultProps={
    title:'set title here',
    aboutText:'About'
}