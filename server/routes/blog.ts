import { Router, Request, Response } from 'express';

import models from '../db/models/index';
import { Model } from 'sequelize';
const Blog = Router();

const Blogpost: any = models.blogpost;
const Keyword: any = models.keyword;
const Blogpost_keyword: any = models.blogpost_keyword;
const User: any = models.user;

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
    const post = await Blogpost.findByPk(postId, { include: [Keyword, User] });
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
    console.error('SERVER ERROR: failed to get blog post', e);
  }
});

Blog.get('/getAllPosts', async (req: Request, res: Response) => {
  try {
    const allPostsResponse = await Blogpost.findAll({ include: [Keyword, User]});
    res.status(200).send(allPostsResponse);
  } catch (e) {
    console.error("SERVER ERROR: failed to get all posts", e);
  }
})

Blog.post('/createPost', async (req: Request, res: Response) => {
  // couldn't create keyword in one felled swoop bc couldn't figure out how to make keyword unique this way
  try {
    const blogpost: Blogpost = req.body.blogpost;
    const createBlogpostResponse = await Blogpost.create({
      title: blogpost.title,
      content: blogpost.content,
      category: blogpost.category,
      userId: blogpost.userId,
    });

    // for each keyword...
    blogpost.keywords.forEach(async (keyword) => {
      // see if it's already in the keyword table
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

  try {
    // get all keywords associated with post
    const findKeywordsResponse = await Blogpost_keyword.findAll({where:{blogpostId: postId}});
    // isolate the keyword id, save for later
    const KeywordIds = findKeywordsResponse.map(record=>record.keywordId);

    // then delete the blog post, which will delete records in Blogpost_keywords
    const deleteBlogpostResponse = await Blogpost.destroy({
      where: {
        id: postId,
      },
    });

    // THEN DEAL WITH KEYWORDS TABLE
    // for each keyword id
    KeywordIds.forEach(async (id)=>{
      // find it
      const keywordResponse = await Keyword.findByPk(id);
      // check if there's more than one
      if (keywordResponse.postCount > 1){
        // if so, decrement it
        const decrementResponse = Keyword.decrement({postCount: 1}, {where: {id}});
      } else { // or else delete it
        const destroyResponse = Keyword.destroy({where: {id}});
      }
    })

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
