import { Request, Response } from "express";
import { ColocMembersService } from "../services/coloc_members.service";
import { ColocService } from "../services/coloc.service";
import { UserService } from "../services/user.service";
import { MemberStatus } from "../databases/mysql/coloc_members.entity";
const colocMembersService = new ColocMembersService();
const colocService = new ColocService();
const userService = new UserService();

export const addMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { colocId, userId, status } = req.body;

    const coloc = await colocService.getColocById(colocId);
    if (!coloc) {
      res.status(404).json({ message: "Coloc not found" });
      return;
    }

    const user = await userService.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const member = await colocMembersService.addMember(
      coloc,
      user,
      status as MemberStatus
    );
    res.status(201).json(member);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getMembersByColocId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { colocId } = req.params;
    const members = await colocMembersService.getMembersByColocId(
      Number(colocId)
    );
    res.json(members);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
export const removeMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { colocId, userId } = req.body;

    const coloc = await colocService.getColocById(colocId);
    if (!coloc) {
      res.status(404).json({ message: "Coloc not found" });
      return;
    }

    const user = await userService.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await colocMembersService.removeMember(coloc, user);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
