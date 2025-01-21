import { Repository } from "typeorm";
import { FinanceEntity } from "../databases/mysql/finance.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";

export class FinanceRepository {
  private financeDB: Repository<FinanceEntity>;

  constructor() {
    this.financeDB = connectMySQLDB.getRepository(FinanceEntity);
  }

  create(finance: Partial<FinanceEntity>): FinanceEntity {
    return this.financeDB.create(finance);
  }

  async save(finance: FinanceEntity): Promise<FinanceEntity> {
    return this.financeDB.save(finance);
  }

  async findByColocId(colocId: number): Promise<FinanceEntity[]> {
    return this.financeDB.find({
      where: { coloc: { id: colocId } },
      relations: ["coloc", "paidBy"],
    });
  }
}
