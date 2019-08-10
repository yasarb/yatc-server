import { Controller, UseGuards, Get, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ViewUserDto } from './dto/view-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @api {post} /users/:id User Profile
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
   *         "password": "$2a$04$EMrm/P79Fv.c4HotqPDZpOzDzr9Y9aUAU0gji7kiRSywv7wFWV6A2",
   *         "email": "abc@def.com",
   *         "lang": "tr",
   *         "photoId": -1,
   *         "registeredAt": "2019-08-10T15:17:55.163Z",
   *         "isActive": true,
   *         "followingCount": 123,
   *         "followerCount": 45,
   *         "likeCount": 652,
   *         "videoList": []
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
  async findOneById(@Req() req, @Param('id') id: number): Promise<ViewUserDto> {
    return this.usersService
      .findUserById(id)
      .then(userDto => {
        return userDto;
      })
      .catch(error => {
        throw error;
      });
  }
}
