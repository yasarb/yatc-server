import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'user_id',
    comment: 'Unique identifier for User',
  })
  userId: number;

  @Column({
    name: 'username',
    length: 32,
    nullable: false,
    unique: true,
    comment: 'Unique username of User',
  })
  username: string;

  @Column({
    name: 'password',
    length: 128,
    nullable: false,
    unique: false,
    comment: 'Encrypted password of User',
  })
  password: string;

  @Column({
    name: 'email',
    length: 128,
    nullable: false,
    unique: true,
    comment: 'Unique email address of User',
  })
  email: string;

  @Column({
    name: 'profile_photo_url',
    length: 128,
    comment: 'URL pointing to the User’s profile image',
  })
  profilePhotoUrl: string;

  @Column({
    name: 'profile_banner_url',
    length: 128,
    comment: 'URL pointing to the User’s profile banner image',
  })
  profileBannerUrl: number;

  @Column({
    name: 'lang',
    length: 2,
    comment: 'Language code in ISO 639-1',
  })
  lang: string;

  @Column({
    name: 'registered_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'When user is registered',
  })
  registeredAt: Date;

  @Column({
    name: 'is_active',
    nullable: false,
    default: true,
    comment: 'Whether User account is active',
  })
  isActive: boolean;

  @Column({
    name: 'is_admin',
    nullable: false,
    default: false,
    comment: 'Whether User has admin privileges',
  })
  isAdmin: boolean;

  @Column({
    name: 'is_private',
    nullable: false,
    default: false,
    comment:
      'Whether User profile is private (non-followers will not see his/her posts)',
  })
  isPrivate: boolean;

  @Column({
    name: 'is_verified',
    nullable: false,
    default: false,
    comment: 'Whether User account is verified',
  })
  isVerified: boolean;
}
