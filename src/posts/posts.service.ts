import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { ViewPostDto } from './dto/view-post.dto';
import { Post } from './post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  async createPost(
    authorId: number,
    createPostDto: CreatePostDto,
  ): Promise<ViewPostDto> {
    return this.usersService
      .findUserById(authorId)
      .then(author => {
        const post = new Post();
        post.author = author;
        post.text = createPostDto.text;

        return post.save();
      })
      .then(entity => {
        return ViewPostDto.fromEntity(entity);
      })
      .catch(error => {
        throw error;
      });
  }

  async findOneById(postId: string): Promise<ViewPostDto> {
    return Post.findOne({ postId }, { relations: ['author'] })
      .then(post => {
        if (post === undefined) {
          throw new NotFoundException('Post with given id was not found.');
        }

        return ViewPostDto.fromEntity(post);
      })
      .catch(error => {
        throw error;
      });
  }
}
