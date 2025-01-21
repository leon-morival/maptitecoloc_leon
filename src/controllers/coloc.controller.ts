import { Request, Response } from "express";
import { ColocService } from "../services/coloc.service";
import { ColocMembersService } from "../services/coloc_members.service";
import { UserService } from "../services/user.service";
import { ColocToCreateDTO } from "../types/coloc/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ColocPresenter } from "../types/coloc/presenter";
import { MemberStatus } from "../databases/mysql/coloc_members.entity";

interface AuthenticatedRequest extends Request {
  user?: {
    sub: number;
    email: string;
    firstname: string;
    lastname: string;
    dob: Date;
  };
}

const colocService = new ColocService();
const colocMembersService = new ColocMembersService();
const userService = new UserService();

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

    // Extract user information from the token
    const userId = (req as AuthenticatedRequest).user?.sub;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await userService.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Add the logged-in user as an admin
    await colocMembersService.addMember(coloc, user, MemberStatus.OWNER);

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
    res.status(200).json(colocPresenter);
  } catch (error) {
    res.status(500).json({ message: "erreur de serveur" });
  }
};
export const deleteColoc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await colocService.deleteColoc(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "erreur de serveur" });
  }
};
