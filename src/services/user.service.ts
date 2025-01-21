import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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
    const userInfo = {
      sub: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      dob: user.dob,
    };
    const token = sign(userInfo, process.env.JWT_SECRET as string, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return { user, token };
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async refreshToken(refreshToken: string) {
    let decoded;
    try {
      // Vérifier le refresh token avec la clé distincte
      decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
    } catch {
      throw new Error("Token invalide");
    }
    // Générer un nouveau token d’accès
    const userInfo = {
      sub: (decoded as any).sub,
      email: (decoded as any).email,
      firstname: (decoded as any).firstname,
      lastname: (decoded as any).lastname,
      dob: (decoded as any).dob,
    };
    const newAccessToken = sign(userInfo, process.env.JWT_SECRET as string, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return { accessToken: newAccessToken };
  }
}
