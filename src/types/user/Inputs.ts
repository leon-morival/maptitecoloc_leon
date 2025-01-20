import { Expose, Type } from "class-transformer";
import { IsString, IsDate } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class userToCreateInput {
  @Expose()
  @IsString()
  firstname: UserEntity["firstname"];

  @Expose()
  @IsString()
  lastname: UserEntity["lastname"];

  @Expose()
  @IsString() // or @IsEmail() if needed
  email: UserEntity["email"];

  @Expose()
  @IsString()
  password_hash: UserEntity["password_hash"];

  @Expose()
  @Type(() => Date)
  @IsDate()
  dob: Date;
}
