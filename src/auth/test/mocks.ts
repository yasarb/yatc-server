import { User } from '../../users/users.service';

/* tslint:disable:no-empty */
export const mockAuthService = {
  validateUser() {},
  signin(req: any) {},
  signup() {},
  signout(authToken: string) {},
};

export const mockUsersService = {
  findByUsername(username: string): Promise<User> {
    return new Promise(() => {});
  },
  save(entity: User): Promise<User> {
    return new Promise(() => {});
  },
};

export const mockJwtService = {
  sign(payload: string) {},
};

export const mockRedisService = {};

export const mockUser: User = {
  userId: 1,
  username: 'mockuser',
  password: 'mockpassword',
  email: 'test@mail.com',
  profilePhotoUrl: '',
  profileBannerUrl: '',
  registeredAt: '',
  isAdmin: false,
  isActive: true,
  isVerified: false,
  isPrivate: false,
};

/* tslint:enable:no-empty */
