import { getTokenFromCookies } from "../utils/cookieUtils.js";

const token = getTokenFromCookies();

if (!token) {
  // console.log("Token cookie doesn't exist. Redirecting to login page...");
  window.location.href = "/login.html";
}
