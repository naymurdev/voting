import { TJwtPayload } from "../user/user.interface";
import { VotePayload, VotingPayload } from "./vote.interface";
import { VotingModel } from "./vote.model";
import { UserModel } from "../user/user.model";
import { candidateInfosModel } from "../../modules/candidate/candidates.model";

export async function vote(user_email: any, candidate: VotingPayload) {
  const checkingCandidate = await candidateInfosModel.findOne({
    "candidate.name": candidate?.candidateName,
    "candidate.partyName": candidate?.partyName,
  });
  if (!checkingCandidate) throw new Error("Invalid Candidate");
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
