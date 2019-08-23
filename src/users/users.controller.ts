import { Controller, UseGuards, Get, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserProfileDto } from './dto/profile.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @api {get} /users/:id User Profile
   * @apiVersion 1.0.0
   * @apiName Profile
   * @apiGroup User
   *
   * @apiParam {Number} id User's unique identifier number.
   *
   * @apiSuccess (200) {Object} user User model
   *
   * @apiSuccessExample {json} Success-Response: 200
   *     HTTP/1.1 200 OK
   *     {
   *         "userId": 1,
   *         "username": "testuser",
   *         "email": "abc@def.com",
   *         "lang": "tr",
   *         "profilePhotoUrl": "",
   *         "profileBannerUrl": "",
   *         "registeredAt": "2019-08-10T15:17:55.163Z",
   *         "isAdmin": false,
   *         "isActive": true,
   *         "isPrivate": false,
   *         "isVerified": false,
   *     }
   *
   * @apiError (404) NotFound No user found with given user id
   *
   * @apiErrorExample {json} Error-Response: 404
   *     HTTP/1.1 404 Not Found
   *     {
   *         "statusCode": 404,
   *         "error": "Not Found",
   *         "message": "`User not found with given id: 1"
   *     }
   *
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneById(@Param('id') id: number): Promise<UserProfileDto> {
    return this.usersService
      .findUserById(id)
      .then(user => {
        const userDto = UserDto.fromEntity(user);
        const { password, ...profileDto } = userDto;
        return profileDto;
      })
      .catch(error => {
        throw error;
      });
  }
}
