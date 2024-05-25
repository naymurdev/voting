import { Country } from "./user.interface";
import { UserModel } from "./user.model";

export async function generateUserId(country: Country) {
  const previousUserId = await getPreviousUserId(country);

  let incrementCode: string | undefined;

  if (previousUserId) {
    incrementCode = previousUserId.substring(3);
  }
  const prefix = getCountryPrefix(country);
  const newIncrementCode = (Number(incrementCode || 0) + 1)
    .toString()
    .padStart(3, "0");

  return `${prefix}-${newIncrementCode}`;
}

async function getPreviousUserId(country: Country) {
  const previousUser = await UserModel.findOne({ country }, { userId: 1 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return previousUser?.userId;
}

function getCountryPrefix(country: Country) {
  switch (country) {
    case "albania":
      return "AL";
    case "bosnia-and-hergezovina":
      return "BH";
    case "bulgaria":
      return "BU";
    case "croatia":
      return "CR";
    case "kosovo":
      return "KO";
    case "montenegro":
      return "MO";
    case "north-macedonia":
      return "NM";
    // case "serbia":
    //   return "SE";
  }
}
