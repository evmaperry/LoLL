import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Splash from './Splash';
import PostCard from './PostCard';

const Home: React.FC = () => {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    const allPostsResponse = await axios.get('/api/blog/getAllPosts');
    setAllPosts(allPostsResponse.data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const allPostCards = allPosts.map((post, index) => {
    return <PostCard post={post} key={index}/>;
  });

  return (
    <>
      <Splash />
      <Typography id='home-title' variant='h1'>
        Home
      </Typography>
      <Box sx={{ px: 10 }}>{allPostCards}</Box>
    </>
  );
};

export default Home;
