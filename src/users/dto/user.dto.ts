import { User } from '../user.entity';

export class UserDto {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly lang: string;
  readonly profilePhotoUrl: string;
  readonly profileBannerUrl: string;
  readonly registeredAt: Date;
  readonly isAdmin: boolean;
  readonly isActive: boolean;
  readonly isPrivate: boolean;
  readonly isVerified: boolean;

  static fromEntity(entity: User): UserDto {
    return {
      userId: entity.userId,
      username: entity.username,
      password: entity.password,
      email: entity.email,
      lang: entity.lang,
      profilePhotoUrl: entity.profilePhotoUrl,
      profileBannerUrl: entity.profileBannerUrl,
      registeredAt: entity.registeredAt,
      isAdmin: entity.isAdmin,
      isActive: entity.isActive,
      isPrivate: entity.isPrivate,
      isVerified: entity.isVerified,
    };
  }
}
