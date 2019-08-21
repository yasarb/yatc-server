import { UserDto } from './user.dto';

export class UserProfileDto {
  readonly userId: number;
  readonly username: string;
  readonly email: string;
  readonly lang: string;
  readonly profilePhotoUrl: string;
  readonly profileBannerUrl: string;
  readonly registeredAt: Date;
  readonly isAdmin: boolean;
  readonly isActive: boolean;
  readonly isPrivate: boolean;
  readonly isVerified: boolean;

  static fromUser(user: UserDto): UserProfileDto {
    const { password, ...profile } = user;
    return profile;
  }
}
