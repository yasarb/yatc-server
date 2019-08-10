import { Controller, UseGuards, Get, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ViewUserDto } from './dto/view-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOneById(@Req() req, @Param('id') id: number): Promise<ViewUserDto> {
    return this.usersService
      .findUserById(id)
      .then(userDto => {
        return userDto;
      })
      .catch();
  }
}
