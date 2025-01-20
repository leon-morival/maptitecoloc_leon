import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ColocEntity } from "./coloc.entity";
import { UserEntity } from "./user.entity";

export enum MemberStatus {
  MEMBER = "member",
  OWNER = "owner",
}

@Entity("coloc_members")
export class ColocMembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColocEntity, (coloc) => coloc.members)
  coloc: ColocEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    type: "enum",
    enum: MemberStatus,
  })
  status: MemberStatus;
}
