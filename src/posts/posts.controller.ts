import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { User as CurrentUser } from '../users/user.decorator';
import { User } from '../users/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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
