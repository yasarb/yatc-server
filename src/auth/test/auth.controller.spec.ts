import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { RedisModule } from '../../redis/redis.module';
import { mockAuthService } from './mocks';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        RedisModule,
      ],
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be signed in', () => {
    const req = {
      user: {
        username: 'test',
        password: 'test',
      },
    };

    jest.spyOn(mockAuthService, 'signin').mockImplementation(arg => {
      return {
        userId: 1,
        username: 'testadmin',
        accessToken: 'access_token',
      };
    });

    return controller
      .signin(req)
      .then(data => {
        /* tslint:disable:no-string-literal */
        expect(data).toHaveProperty('userId');
        expect(data['userId']).toBe(1);
        expect(data).toHaveProperty('username');
        expect(data['username']).toBe('testadmin');
        expect(data).toHaveProperty('accessToken');
        expect(data['accessToken']).toBe('access_token');
        /* tslint:enable:no-string-literal */
      })
      .catch(error => {
        throw error;
      });
  });

  it('should throw exception while signing in', () => {
    const req = {
      user: {
        username: 'test',
        password: 'test',
      },
    };

    jest.spyOn(mockAuthService, 'signin').mockImplementation(() => {
      throw new UnauthorizedException();
    });

    return controller
      .signin(req)
      .then(data => data)
      .catch(error => {
        expect(error).toBeInstanceOf(UnauthorizedException);
      });
  });

  it('should be signed out', () => {
    jest.spyOn(mockAuthService, 'signout').mockImplementation(args => {}); // tslint:disable-line
    const token = 'token';
    const authHeader = 'Bearer ' + token;

    return controller
      .signout(authHeader)
      .then(() => {
        expect(mockAuthService.signout).toBeCalledWith(token);
        expect(mockAuthService.signout).not.toThrowError(UnauthorizedException);
      })
      .catch(error => {
        expect(error).toBe(undefined);
        expect(mockAuthService.signout).not.toThrowError();
      });
  });

  it('should throw exception if auth header is invalid', async () => {
    const headerInteger = 123456789;
    const headerNotBearer = 'Token 123';
    const headerHasLength1 = 'Token';
    const headerHasLength3 = 'Token token token';

    jest.spyOn(mockAuthService, 'signout').mockImplementation(args => {}); // tslint:disable-line

    try {
      await controller.signout(headerInteger);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }

    try {
      await controller.signout(headerNotBearer);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }

    try {
      await controller.signout(headerHasLength1);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }

    try {
      await controller.signout(headerHasLength3);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
});
