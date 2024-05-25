export function getVotedInfo() {
  const cookiesString = document.cookie;
  const token_cookies = cookiesString
    .split(";")
    .reduce((cookiesObject, cookie) => {
      const [name, value] = cookie.trim().split("=");
      cookiesObject[name] = value;
      return cookiesObject;
    }, {});
  return token_cookies["Voted"];
}
