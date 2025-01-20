import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ColocMembersEntity } from "./coloc_members.entity";

@Entity("colocs")
export class ColocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  location: string;

  @Column("float")
  surface: number;

  @Column("int")
  numberOfRooms: number;

  @Column({ length: 50 })
  agency: string;

  @OneToMany(() => ColocMembersEntity, (member) => member.coloc, {
    cascade: true,
  })
  members: ColocMembersEntity[];
}
