import { Repository } from "typeorm";
import { ColocMembersEntity } from "../databases/mysql/coloc_members.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocEntity } from "../databases/mysql/coloc.entity";
import { UserEntity } from "../databases/mysql/user.entity";
import { MemberStatus } from "../databases/mysql/coloc_members.entity";

export class ColocMembersRepository {
  private colocMembersDB: Repository<ColocMembersEntity>;

  constructor() {
    this.colocMembersDB = connectMySQLDB.getRepository(ColocMembersEntity);
  }

  create(
    coloc: ColocEntity,
    user: UserEntity,
    status: MemberStatus
  ): ColocMembersEntity {
    const newMember = this.colocMembersDB.create({ coloc, user, status });
    return newMember;
  }

  async save(member: ColocMembersEntity): Promise<ColocMembersEntity> {
    return this.colocMembersDB.save(member);
  }

  async findByColocId(colocId: number): Promise<ColocMembersEntity[]> {
    return this.colocMembersDB.find({
      where: { coloc: { id: colocId } },
      relations: ["coloc", "user"],
    });
  }
  async remove(member: ColocMembersEntity): Promise<void> {
    await this.colocMembersDB.remove(member);
  }
}
