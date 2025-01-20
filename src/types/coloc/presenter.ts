import { Expose } from "class-transformer";
import { IsString, IsNumber } from "class-validator";
import { ColocEntity } from "../../databases/mysql/coloc.entity";

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
}
