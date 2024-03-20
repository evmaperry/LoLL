import { Router, Request, Response } from "express";

const Blog = Router();

Blog.get('/test', (req: Request, res: Response) => {
  res.send('Testing');
})

export default Blog;
