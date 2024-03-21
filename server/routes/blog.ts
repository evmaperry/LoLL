import { Router, Request, Response } from 'express';

import models from '../db/models/index';
import { Model } from 'sequelize';
const Blog = Router();

const Blogpost: any = models.blogpost;
const Keyword: any = models.keyword;
const Blogpost_keyword: any = models.blogpost_keyword;

interface Blogpost {
  title: string;
  content: string;
  category: string;
  keywords: string[];
  userId: number;
}

Blog.get('/test', (req: Request, res: Response) => {
  res.send('Testing');
});

Blog.get('/post/:postId', async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const post = await Blogpost.findByPk(postId, { include: Keyword });
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
    console.error('SERVER ERROR: failed to get blog post', e);
  }
});

Blog.post('/createPost', async (req: Request, res: Response) => {
  try {
    const blogpost: Blogpost = req.body.blogpost;
    const createBlogpostResponse = await Blogpost.create({
      title: blogpost.title,
      content: blogpost.content,
      category: blogpost.category,
      userId: blogpost.userId,
      //   keywords: blogpost.keywords.map((keyword) => {
      //     return { keyword };
      //   }),
      // },
      // {
      //   include: Keyword,
    });

    blogpost.keywords.forEach(async (keyword) => {
      const findKeywordResponse = await Keyword.findOne({
        where: {
          keyword,
        },
      });

      // if a keyword is not found, create a new one, create blogpost_keywords too
      if (!findKeywordResponse) {
        try {
          const createKeywordResponse = await Keyword.create({
            keyword: keyword,
            postCount: 1,
          });

          const createBlogpostKeywordResponse = await Blogpost_keyword.create({
            blogpostId: createBlogpostResponse.id,
            keywordId: createKeywordResponse.id
          })
        } catch (e) {
          console.error('SERVER ERROR: failed to create keyword', e);
        }
      }

      // if a keyword is found, increment the postCount, create blogpost_keywords
      else if (findKeywordResponse) {
        const keywordIncrementResponse = await Keyword.increment({postCount: 1}, {where: {keyword}})
        const createBlogpostKeywordResponse = await Blogpost_keyword.create({
          blogpostId: createBlogpostResponse.id,
          keywordId: findKeywordResponse.id
        })
      }

    });

    res.status(201).send(createBlogpostResponse);
  } catch (e) {
    res.status(500).send(e);
    console.error('SERVER ERROR: failed to post blogpost', e);
  }
});

Blog.delete('/deletePost/:postId', async (req: Request, res: Response) => {
  const postId = req.params.postId;
  console.log('postId', postId);
  try {
    const deleteBlogpostResponse = await Blogpost.destroy({
      where: {
        id: postId,
      },
    });

    console.log('dBR', deleteBlogpostResponse);

    if (deleteBlogpostResponse === 1) {
      res.status(200).send('Blogpost deleted');
    } else {
      res.status(404).send('Blogpost ID not found');
    }
  } catch (e) {
    res.status(500).send(e);
    console.error('SERVER ERROR: failed to delete post', e);
  }
});

export default Blog;
