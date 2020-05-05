import { User } from '../../users/users.service';
import { Post } from '../post.entity';

export class ViewPostDto {
  readonly postId: string;
  readonly text: string;
  readonly authorId: User;
  readonly createdAt: Date;

  static fromEntity(entity: Post): ViewPostDto {
    return {
      postId: entity.postId,
      text: entity.text,
      authorId: entity.author.userId,
      createdAt: entity.createdAt,
    };
  }
}
