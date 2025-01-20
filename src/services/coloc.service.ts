import { ColocRepository } from "../repositories/coloc.repository";
import { ColocToCreateDTO } from "../types/coloc/dtos";
import { ColocEntity } from "../databases/mysql/coloc.entity";

export class ColocService {
  private colocRepository: ColocRepository;

  constructor() {
    this.colocRepository = new ColocRepository();
  }

  async createColoc(colocToCreateDTO: ColocToCreateDTO): Promise<ColocEntity> {
    const coloc = this.colocRepository.create(colocToCreateDTO);
    return this.colocRepository.save(coloc);
  }

  async getColocById(id: number): Promise<ColocEntity | null> {
    return this.colocRepository.findById(id);
  }
}
