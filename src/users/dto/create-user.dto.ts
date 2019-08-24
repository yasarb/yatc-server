import {
  IsNotEmpty,
  IsAlphanumeric,
  MaxLength,
  IsEmail,
  IsISO31661Alpha2,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(32)
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  readonly email: string;

  @IsNotEmpty()
  @Length(2)
  readonly lang: string;
}
