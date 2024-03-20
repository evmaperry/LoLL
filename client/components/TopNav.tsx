import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const TopNav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box color='secondary.light' sx={{ flexGrow: 1 }}>
      <AppBar color='transparent' position='fixed'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color='white'
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            Long Lake Forever
          </Typography>
          <Box>
            <Button
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => {
                navigate('/mission');
              }}
            >
              Mission
            </Button>
            <Button
              onClick={() => {
                navigate('/invasives');
              }}
            >
              Invasives
            </Button>
            <Button
              onClick={() => {
                navigate('/shoreline');
              }}
            >
              Shoreline
            </Button>
            <Button
              onClick={() => {
                navigate('/getinvolved');
              }}
            >
              Get Involved
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNav;
