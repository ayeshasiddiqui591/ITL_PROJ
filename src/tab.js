import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './Login';
import backgroundImage from './Background.png';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // Set height to cover the entire viewport
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover', // Ensure the image covers the entire container
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth" // Ensure tab covers full width
          sx={{ color: 'white' }} // Set text color to white
        >
          <Tab label="Customer Login" {...a11yProps(0)} sx={{ height: '100%', minWidth: 'unset',color:'white' }} />
          <Tab label="Vendor Login" {...a11yProps(1)} sx={{ height: '100%', minWidth: 'unset',color: 'white' }} />
        </Tabs>
      </Box>
      <Box sx={{ position: 'relative', zIndex: 0 }}>
        <CustomTabPanel value={value} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Login />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
