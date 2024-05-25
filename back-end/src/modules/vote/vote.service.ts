import { TJwtPayload } from "../user/user.interface";
import { VotingModel } from "./vote.model";
import { UserModel } from "../user/user.model";

export async function vote(user_email: any, candidate: any) {

  const user = await UserModel.findOne({ email: user_email });
  console.log(user);

  if (user?.voted?.vote) {
    return "You have already voted";
  } else {
    const result = await UserModel.findOneAndUpdate(
      { email: user_email },
      {
        voted: {
          vote: true,
          partyName: candidate?.candidateName,
          candidateName: candidate?.partyName,
        },
      },
      {
        new: true,
      }
    );
    return result;
  }
}
export async function upComingVoteServices() {
  try {
    const result = await VotingModel.find();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
