import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: {
    sub: number;
    email: string;
    firstname: string;
    lastname: string;
    dob: Date;
  };
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "string") {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    (req as AuthenticatedRequest).user = decoded as JwtPayload & {
      sub: number;
      email: string;
      firstname: string;
      lastname: string;
      dob: Date;
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
