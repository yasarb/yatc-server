import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import * as shortid from 'shortid';
import { User } from '../users/user.entity';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'post_id',
    length: 14,
    comment: 'Unique identifier for Post',
  })
  postId: string;

  @Column({
    name: 'text',
    length: '150',
    nullable: false,
    default: '',
    comment: 'Content of the Post',
  })
  text: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @Column({
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'When post is created',
  })
  createdAt: Date;

  @BeforeInsert()
  updateId() {
    this.postId = shortid.generate();
  }
}
