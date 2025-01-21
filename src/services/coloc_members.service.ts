import { ColocMembersRepository } from "../repositories/coloc_members.repository";
import { ColocEntity } from "../databases/mysql/coloc.entity";
import { UserEntity } from "../databases/mysql/user.entity";
import { MemberStatus } from "../databases/mysql/coloc_members.entity";
import { ColocMembersEntity } from "../databases/mysql/coloc_members.entity";

export class ColocMembersService {
  private colocMembersRepository: ColocMembersRepository;

  constructor() {
    this.colocMembersRepository = new ColocMembersRepository();
  }

  async addMember(
    coloc: ColocEntity,
    user: UserEntity,
    status: MemberStatus
  ): Promise<ColocMembersEntity> {
    const member = this.colocMembersRepository.create(coloc, user, status);
    return this.colocMembersRepository.save(member);
  }

  async getMembersByColocId(colocId: number): Promise<ColocMembersEntity[]> {
    return this.colocMembersRepository.findByColocId(colocId);
  }
  async removeMember(coloc: ColocEntity, user: UserEntity): Promise<void> {
    const member = await this.colocMembersRepository.findByColocIdAndUserId(
      coloc.id,
      user.id
    );
    if (member) {
      await this.colocMembersRepository.remove(member);
    }
  }
}
