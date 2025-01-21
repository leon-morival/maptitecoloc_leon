import { FinanceRepository } from "../repositories/finance.repository";
import { FinanceEntity } from "../databases/mysql/finance.entity";
import { ColocRepository } from "../repositories/coloc.repository";
import { UserRepository } from "../repositories/user.repository";

export class FinanceService {
  private financeRepository = new FinanceRepository();
  private colocRepository = new ColocRepository();
  private userRepository = new UserRepository();

  async addCharge(
    description: string,
    amount: number,
    colocId: number,
    paidById: number,
    date: Date
  ): Promise<FinanceEntity> {
    const coloc = await this.colocRepository.findById(colocId);
    if (!coloc) {
      throw new Error("Coloc not found");
    }

    const user = await this.userRepository.findById(paidById);
    if (!user) {
      throw new Error("User not found");
    }

    const finance = this.financeRepository.create({
      description,
      amount,
      coloc,
      paidBy: user,
      date,
    });
    return this.financeRepository.save(finance);
  }

  async getFinanceHistory(colocId: number): Promise<FinanceEntity[]> {
    return this.financeRepository.findByColocId(colocId);
  }
}
