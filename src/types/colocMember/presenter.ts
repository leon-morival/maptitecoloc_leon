import { Expose, Type } from "class-transformer";
import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator";
import { ColocMembersEntity } from "../../databases/mysql/coloc_members.entity";

export class ColocMemberPresenter {
  @Expose()
  @IsNumber()
  id: ColocMembersEntity["id"];

  @Expose()
  @IsString()
  coloc: ColocMembersEntity["coloc"];

  @Expose()
  @IsString()
  user: ColocMembersEntity["user"];

  @Expose()
  @IsString()
  status: ColocMembersEntity["status"];

  @Expose()
  @IsArray()
  @Type(() => ColocMemberPresenter)
  @ValidateNested({ each: true })
  members: ColocMemberPresenter[];
}
