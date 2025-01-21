import { UserEntity } from "../../databases/mysql/user.entity";

declare global {
  namespace Express {
    interface User {
      sub: number;
    }

    interface Request {
      user?: Partial<UserEntity> & { sub: number };
    }
  }
}
