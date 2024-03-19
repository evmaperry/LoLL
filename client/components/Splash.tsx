import React from 'react';
import { Image } from 'mui-image';
import { Box } from '@mui/material';

const Splash: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Long_Lake_Traverse_City.jpg'
        fit='cover'
      />
    </Box>
  );
};

export default Splash;
