import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY

    // ON HASH LE MOT DE PASSE
    const password_hash = await hash(userToCreate.password, 10);
    // ON CRÉE L'UTILISATEUR

    const createdUser = this.userRepository.create({
      ...userToCreate,
      password_hash,
      dob: userToCreate.dob,
    });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = sign({ sub: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return { user, token };
  }
}
