import { Request, Response } from "express";
import { ColocService } from "../services/coloc.service";
import { ColocToCreateDTO } from "../types/coloc/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocPresenter } from "../types/coloc/presenter";

const colocService = new ColocService();

export const createColoc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const colocToCreateDTO = plainToInstance(ColocToCreateDTO, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(colocToCreateDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const coloc = await colocService.createColoc(colocToCreateDTO);

    const createdColoc = plainToInstance(ColocPresenter, coloc, {
      excludeExtraneousValues: true,
    });
    res.status(201).json(createdColoc);
  } catch (error) {
    throw error;
  }
};

export const getColocById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const coloc = await colocService.getColocById(Number(id));
    if (!coloc) {
      res.status(404).json({ message: "Coloc not found" });
      return;
    }
    const colocPresenter = plainToInstance(ColocPresenter, coloc, {
      excludeExtraneousValues: true,
    });
    res.json(colocPresenter);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
