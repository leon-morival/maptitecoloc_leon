import { Expose, Type } from "class-transformer";
import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator";
import { ColocEntity } from "../../databases/mysql/coloc.entity";
import { ColocMemberPresenter } from "../colocMember/presenter";

export class ColocPresenter {
  @Expose()
  @IsNumber()
  id: ColocEntity["id"];

  @Expose()
  @IsString()
  location: ColocEntity["location"];

  @Expose()
  @IsNumber()
  surface: ColocEntity["surface"];

  @Expose()
  @IsNumber()
  numberOfRooms: ColocEntity["numberOfRooms"];

  @Expose()
  @IsString()
  agency: ColocEntity["agency"];

  @Expose()
  @IsArray()
  @Type(() => ColocMemberPresenter)
  @ValidateNested({ each: true })
  members: ColocMemberPresenter[];
}
