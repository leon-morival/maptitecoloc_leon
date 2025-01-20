import { Repository } from "typeorm";
import { ColocEntity } from "../databases/mysql/coloc.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocToCreateDTO } from "../types/coloc/dtos";

export class ColocRepository {
  private colocDB: Repository<ColocEntity>;

  constructor() {
    this.colocDB = connectMySQLDB.getRepository(ColocEntity);
  }

  create(coloc: ColocToCreateDTO): ColocEntity {
    const newColoc = this.colocDB.create(coloc);
    return newColoc;
  }

  async save(coloc: ColocEntity): Promise<ColocEntity> {
    return this.colocDB.save(coloc);
  }

  async findById(id: number): Promise<ColocEntity | null> {
    return this.colocDB.findOne({
      where: { id },
      relations: ["members", "members.user"],
    });
  }
}
