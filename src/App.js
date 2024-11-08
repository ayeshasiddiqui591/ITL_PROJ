import './App.css';
import SignUp from './signup';
import Seller from './signup1';
import Home from './home';
import TitlebarImageList from './category.js';
import BasicTabs from  './tab.js';
import Map from './map.js';
import Profile from './profile.js';
import Dashboard from './dashboard.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Favorite from './favourite.js';
import Dashboardvendor from './dashboardvendor.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup1" element={<Seller />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tab" element={<BasicTabs/>}/>    
          <Route path="/category" element={<TitlebarImageList/>}/>  
          <Route path="/map" element={<Map/>}/>  
          <Route path="/" element={<Home />} /> 
          <Route path='/profile' element={<Profile />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/favourite' element={<Favorite />}/>
          <Route path='/dashboardvendor' element={<Dashboardvendor />}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
