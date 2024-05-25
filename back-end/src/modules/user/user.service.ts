import { env } from "../../config";
import { AppError } from "../../utils";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginPayload, User } from "./user.interface";
import { UserModel } from "./user.model";

export function add(payload: User) {
  return UserModel.create(payload);
}

export async function login(payload: LoginPayload) {
  let user;
  console.log(payload);

  if (payload) {
    user = await UserModel.findOne({
      $or: [{ email: payload.userIdendity }, { userId: payload.userIdendity }],
    });
  }

  console.log(user);

  if (!user) throw new AppError(404, "No user found!");

  const isMatched = await compare(payload.password, user.password);

  if (!isMatched) throw new AppError(401, "Password does not match.");

  const token = jwt.sign(
    {
      userID: user.userId,
      country: user.country,
      email: user.email,
      name: user.name,
    },
    env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    token,
    user,
  };
}
