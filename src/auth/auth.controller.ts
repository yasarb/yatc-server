import {
  Controller,
  Post,
  UseGuards,
  Request,
  Headers,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @api {post} /auth/signin Sign In
   * @apiVersion 1.0.0
   * @apiName SignIn
   * @apiGroup Auth
   *
   * @apiParam {String} username User's unique username.
   * @apiParam {String} password User's password.
   *
   * @apiSuccess (200) {String} accessToken Token to be used to make authenticated requests
   *
   * @apiSuccessExample {json} Success-Response: 200
   *     HTTP/1.1 200 OK
   *     {
   *       "userId": 1,
   *       "username": "admin",
   *       "accessToken": "eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k",
   *     }
   *
   * @apiError (400) BadRequest Some of required fiels (username & password) are missing.
   *
   * @apiErrorExample {text} Error-Response: 400
   *     HTTP/1.1 400 Bad Request
   *     Bad Request
   *
   * @apiError (401) Unauthorized Given credentials are incorrect.
   *
   * @apiErrorExample {json} Error-Response: 401
   *     HTTP/1.1 401 Unauthorized
   *     {
   *         "statusCode": 401,
   *         "error": "Unauthorized",
   *         "message": "Incorrect username or password."
   *     }
   */
  @Post('/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  /**
   * @api {post} /auth/signup Sign Up
   * @apiVersion 1.0.0
   * @apiName SignUp
   * @apiGroup Auth
   *
   * @apiParam {String} username User's unique name.
   * @apiParam {String} password User's password.
   * @apiParam {String} email User's email address.
   * @apiParam {String} lang User's language code.
   *
   * @apiSuccess (200) {Number} userId User's unique identifier
   *
   * @apiSuccessExample Success-Response: 200
   *     HTTP/1.1 200 OK
   *     {
   *       "userId": 123,
   *     }
   *
   * @apiError (400) BadRequest Some of required fiels are missing.
   *
   * @apiErrorExample {text} Error-Response: 400
   *     HTTP/1.1 400 Bad Request
   *     Bad Request
   *
   * @apiError (401) Unauthorized Given credentials are invalid.
   *
   * @apiErrorExample {json} Error-Response: 401
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "statusCode": 401,
   *       "error": "Unauthorized"
   *     }
   *
   */
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService
      .signup(createUserDto)
      .then(user => {
        return user.userId;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * @api {post} /auth/signout Sign Out
   * @apiVersion 1.0.0
   * @apiName SignOut
   * @apiGroup Auth
   *
   * @apiHeader {String} Authorization User's token
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOi.eyJ1c2VybmFt.NeIgBi8V1k"
   *     }
   *
   * @apiSuccess (204)
   *
   * @ApiError (401) Unauthorized Given token is invalid.
   *
   * @apiErrorExample {json} Error-Response: 401
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "statusCode": 401,
   *       "error": "Unauthorized"
   *     }
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/signout')
  @HttpCode(204)
  async signout(@Headers('authorization') auth) {
    const token = auth.split(' ')[1];
    return this.authService.signout(token);
  }
}
