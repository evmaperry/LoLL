import React from 'react';
import Typography from '@mui/material/Typography';
import Splash from './Splash';

const Home: React.FC = () => {
  return (
    <>
      <Splash />
      <Typography variant='h1'>Home</Typography>
    </>
  );
};

export default Home;
