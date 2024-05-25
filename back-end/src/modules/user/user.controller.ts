import { catchAsync } from "../../utils";
import { sendResponse } from "../../utils/send-response";
import { setCookie } from "../../utils/set-cookie";
import { LoginPayload, User } from "./user.interface";
import * as userServices from "./user.service";

export const registerUser = catchAsync<User>(async (req, res) => {
  const data = await userServices.add(req.body);

  sendResponse(res, {
    message: "User registration successful",
    data,
  });
});

export const loginUser = catchAsync<LoginPayload>(async (req, res) => {
  const { user, token } = await userServices.login(req.body);

  // setCookie(res, token);

  sendResponse(res, {
    message: "User login successful",
    data: { user, token },
  });
});
