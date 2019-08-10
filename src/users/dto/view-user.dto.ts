import { User } from '../user.entity';

export class ViewUserDto {
  readonly userId: number;
  readonly username: string;
  readonly password: string; // todo extract this
  readonly email: string;
  readonly lang: string;
  readonly photoId: number; // todo change to 'photoUrl'
  readonly registeredAt: Date;
  readonly isActive: boolean;
  readonly followingCount: number;
  readonly followerCount: number;
  readonly likeCount: number;
  readonly videoList: any[];

  static fromEntity(entity: User): ViewUserDto {
    return {
      userId: entity.userId,
      username: entity.username,
      password: entity.password,
      email: entity.email,
      lang: entity.lang,
      photoId: entity.photoId,
      registeredAt: entity.registeredAt,
      isActive: entity.isActive,
      followingCount: 123,
      followerCount: 45,
      likeCount: 652,
      videoList: [],
    };
  }
}
