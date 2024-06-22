import { env } from "../../config";
import { AppError } from "../../utils";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginPayload, User } from "./user.interface";
import { UserModel } from "./user.model";
import shortid from "shortid";
import nodemailer from "nodemailer";

const Euser = "afsin.sayem1@gmail.com";

export async function add(payload: User) {
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
      email: user.email,
      name: user.name,
    },
    env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  let theCode = shortid.generate();
  await UserModel.findOneAndUpdate(
    {
      $or: [{ email: payload.userIdendity }, { userId: payload.userIdendity }],
    },
    { $set: { confirmationCode: theCode } }
  );

  let html = `
  <style>
     .heroku_car {
       color: red;
     }

     .confirm_{
       padding: 10px 30px;
       background-color: blue;
       color: #fff;

       text-decoration: none;
     }
  </style>

   <div>
       <span style="color: #303030;">Regards,</span>
       <br/>
       <span style="font-size: 16px;color: #606060;"> ${user.name} | ${user.email} </span>
       <br/>
       <p>
         your confirmation code <span style="font-size: 20px;color: #606060;">${theCode}</span>
       </p>
   </div>
 `;

  let details = {
    from: `"Confirmation Form" <${Euser}>`,
    to: user.email,
    subject: "[Afsinur Rahman] New message received.",
    html,
  };

  try {
    nodemailer
      .createTransport({
        service: "gmail",
        auth: { user: Euser, pass: `ogxpooizxurbzywm` },
      })
      .sendMail(details, (err: any) => {
        if (err) {
          console.log(err);
        }
      });
  } catch (error: any) {
    console.log(error);
  }

  return {
    token,
    user,
  };
}

export async function matchCode(payload: any) {
  let user = await UserModel.findOne({
    $or: [{ email: payload?.userIdendity }, { userId: payload?.userIdendity }],
    confirmationCode: payload?.code,
  });

  if (user) {
    return true;
  } else {
    return false;
  }
}
