import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { User as CurrentUser } from '../users/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * @api {post} /posts Create a post
   * @apiVersion 1.0.0
   * @apiName CreatePost
   * @apiGroup Post
   *
   * @apiHeader {String} Authorization User's token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *         "Authorization": "Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k"
   *     }
   *
   * @apiSuccess (201) Create Post is created successfully.
   *
   * @apiSuccessExample {json} Success-Response: 201
   *     HTTP/1.1 201 Created
   *     {
   *         "postId": "TURK6PFAL",
   *         "text": "Lorem ipsum dolar sit amet",
   *         "authorId": 3,
   *         "createdAt": "2019-08-10T15:17:55.163Z",
   *     }
   *
   * @apiError (400) BadRequest Some of required fiels are missing.
   *
   * @apiErrorExample {json} Error-Response: 400
   *     HTTP/1.1 400 Bad Request
   *     {
   *         "statusCode": 400,
   *         "error": "Bad Request",
   *         "message": [
   *             {
   *                 "target": {},
   *                 "property": "text",
   *                 "children": [],
   *                 "constraints": {
   *                     "maxLength": "text must be shorter than or equal to 150 characters",
   *                     "isString": "text must be a string",
   *                     "isNotEmpty": "text should not be empty"
   *                 }
   *             }
   *         ]
   *     }
   *
   * @apiError (401) Unauthorized Given credentials are incorrect.
   *
   * @apiErrorExample {json} Error-Response: 401
   *     HTTP/1.1 401 Unauthorized
   *     {
   *         "statusCode": 401,
   *         "error": "Unauthorized",
   *     }
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.postsService
      .createPost(userId, createPostDto)
      .then(post => {
        return post;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * @api {get} /posts/:id Retrieve a post
   * @apiVersion 1.0.0
   * @apiName GetPost
   * @apiGroup Post
   *
   * @apiHeader {String} Authorization User's token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *         "Authorization": "Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k"
   *     }
   *
   * @apiParam {Number} id Post's unique identifier number.
   *
   * @apiSuccess (200) {Object} post Post model
   *
   * @apiSuccessExample {json} Success-Response: 200
   *     HTTP/1.1 200 OK
   *     {
   *         "postId": "DTRNrC9ma",
   *         "text": "To be or not to be",
   *         "authorId": 1,
   *         "createdAt": "2019-08-23T21:10:23.404Z"
   *     }
   *
   * @apiError (404) NotFound No post found with given post id
   *
   * @apiErrorExample {json} Error-Response: 404
   *     HTTP/1.1 404 Not Found
   *     {
   *         "statusCode": 404,
   *         "error": "Not Found",
   *         "message": "Post with given id was not found."
   *     }
   *
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') postId: string) {
    return this.postsService
      .findOneById(postId)
      .then(post => {
        return post;
      })
      .catch(error => {
        throw error;
      });
  }
}
