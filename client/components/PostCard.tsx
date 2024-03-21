import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Linkify from 'react-linkify';

interface PostCardProps {
  post: any;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { id, title, content, category, keywords, user } = post;

  return (
    <Card sx={{ m: 1 }}>
      <CardContent>
        <Linkify>
          <Typography variant='h4'>{title}</Typography>
          <Typography
            sx={{
              pt: 1,
            }}
          >
            {content.slice(0, 200)}...
          </Typography>
        </Linkify>
      </CardContent>
      <CardActions>
        <Button>Share on Facebook</Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
