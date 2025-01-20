import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class UserPresenter {
  @Expose()
  @IsNumber()
  id: UserEntity["id"];

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
  // e.g. @IsBoolean()
  isActive: boolean;
}
