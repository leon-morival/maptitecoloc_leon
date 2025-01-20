import { Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import {
  ColocMembersEntity,
  MemberStatus,
} from "../../databases/mysql/coloc_members.entity";
import { UserPresenter } from "../user/presenters";

export class ColocMemberPresenter {
  @Expose()
  @IsNumber()
  id: ColocMembersEntity["id"];

  @Expose()
  @IsString()
  status: MemberStatus;

  @Expose()
  @Type(() => UserPresenter)
  user: UserPresenter;
}
