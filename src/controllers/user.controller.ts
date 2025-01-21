import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";

const userService = new UserService();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, {
      excludeExtraneousValues: true,
    });

    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      console.log(dtoErrors);
      throw new Error("Invalid fields");
    }

    const user = await userService.registerUser(userToCreateDTO);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, {
      excludeExtraneousValues: true,
    });
    res.status(201).json(createdUser); // à vous de créer une class pour gérer les success
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await userService.refreshToken(refreshToken);
    res.json(newTokens);
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Nouvelle méthode pour récupérer le profil utilisateur connecté
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // L'ID utilisateur est stocké dans req.user.sub
    const user = await userService.findById(req.user?.sub as number);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const userPresenter = plainToInstance(UserPresenter, user, {
      excludeExtraneousValues: true,
    });
    res.json(userPresenter);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
