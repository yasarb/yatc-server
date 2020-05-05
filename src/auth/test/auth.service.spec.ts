import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import {
  mockUsersService,
  mockJwtService,
  mockRedisService,
  mockUser,
  mockAuthService,
} from './mocks';
import { RedisService } from '../../redis/redis.service';
import { User } from '../../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be signed in', () => {
    const userArg = {
      userId: 1,
      username: 'testuser',
    };

    const accessToken = 'signed-payload';

    jest.spyOn(mockJwtService, 'sign').mockImplementation(payload => {
      return accessToken;
    });

    const data = service.signin(userArg);

    /* tslint:disable:no-string-literal */
    expect(data).toBeDefined();
    expect(data).toHaveProperty('userId');
    expect(data['userId']).toBe(userArg['userId']);
    expect(data).toHaveProperty('username');
    expect(data['username']).toBe(userArg['username']);
    expect(data).toHaveProperty('accessToken');
    expect(data['accessToken']).toBe(accessToken);
    /* tslint:enable:no-string-literal */
  });

  it('should validate user', async () => {
    jest.spyOn(mockUsersService, 'findByUsername').mockImplementation(args => {
      return new Promise((resolve, reject) => {
        resolve(mockUser);
      });
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(args => {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    });

    return service
      .validateUser('testadmin', 'password')
      .then(data => {
        expect(data).toBeDefined();
        expect(data).toHaveProperty('userId');
        expect(mockUsersService.findByUsername).toBeCalledWith('testadmin');
        expect(bcrypt.compare).toBeCalledWith('password', mockUser.password);
      })
      .catch(error => {
        throw error;
      });
  });

  it('should throw error when username is invalid', async () => {
    jest.spyOn(mockUsersService, 'findByUsername').mockImplementation(args => {
      return new Promise((resolve, reject) => {
        resolve(undefined);
      });
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(args => {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    });

    return service
      .validateUser('invalidname', 'password')
      .then(data => {
        expect(data).not.toBeDefined();
      })
      .catch(error => {
        expect(mockUsersService.findByUsername).toBeCalledWith('invalidname');
        expect(error).toBeInstanceOf(UnauthorizedException);
      });
  });

  it('should throw error when password is invalid', async () => {
    jest.spyOn(mockUsersService, 'findByUsername').mockImplementation(args => {
      return new Promise((resolve, reject) => {
        resolve(mockUser);
      });
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(args => {
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    });

    return service
      .validateUser('username', 'invalidpassword')
      .then(data => {
        expect(data).not.toBeDefined();
      })
      .catch(error => {
        expect(mockUsersService.findByUsername).toBeCalledWith('username');
        expect(bcrypt.compare).toBeCalledWith(
          'invalidpassword',
          mockUser.password,
        );
        expect(error).toBeInstanceOf(UnauthorizedException);
      });
  });

  it('should be signed up', () => {
    const createUserDto: CreateUserDto = {
      username: 'newuser',
      password: 'newpassword',
      email: 'newuser@mail.com',
      lang: 'tr',
    };

    jest.spyOn(service, 'getSaltRound').mockImplementation(() => {
      return 1;
    });

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve('password-hash');
      });
    });

    jest.spyOn(mockUsersService, 'save').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(mockUser);
      });
    });

    return service
      .signup(createUserDto)
      .then(data => {
        const saltRound = service.getSaltRound();
        expect(bcrypt.hash).toBeCalledWith(createUserDto.password, saltRound);
        expect(service.getSaltRound).toBeCalledTimes(2);
      })
      .catch(error => {
        throw error;
      });
  });

  it('should throw exception when dto is invalid', () => {
    const createUserDto: CreateUserDto = {
      username: 'newuserrrrrrrrrrrrrrrrrrrrrrrrrrra-*?',
      password: '',
      email: 'invalidmail',
      lang: 'trtr',
    };

    jest.spyOn(service, 'getSaltRound').mockImplementation(() => {
      return 1;
    });

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve('password-hash');
      });
    });

    jest.spyOn(mockUsersService, 'save').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(mockUser);
      });
    });

    return service
      .signup(createUserDto)
      .then(data => {
        const saltRound = service.getSaltRound();
        expect(bcrypt.hash).toBeCalledWith(createUserDto.password, saltRound);
        expect(service.getSaltRound).toBeCalledTimes(2);
      })
      .catch(error => {
        throw error;
      });
  });
});
