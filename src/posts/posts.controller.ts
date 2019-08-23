import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { User as CurrentUser } from '../users/user.decorator';
import { User } from '../users/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * @api {post} /posts Create a post
   * @apiVersion 1.0.0
   * @apiName CreatePost
   * @apiGroup Posts
   *
   * @apiHeader {String} Authorization User's token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k"
   *     }
   *
   * @apiSuccess (201) Create Post is created successfully.
   *
   * @apiSuccessExample {json} Success-Response: 201
   *     HTTP/1.1 201 Created
   *     {
   *       "postId": "TURK6PFAL",
   *       "text": "Lorem ipsum dolar sit amet",
   *       "authorId": 3,
   *       "createdAt": "2019-08-10T15:17:55.163Z",
   *     }
   *
   * @apiError (400) BadRequest Some of required fiels are missing.
   *
   * @apiErrorExample {text} Error-Response: 400
   *     HTTP/1.1 400 Bad Request
   *     Bad Request
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
}
