import { catchAsync } from "../../utils";
import { sendResponse } from "../../utils/send-response";
import { VotePayload, VotingPayload } from "./vote.interface";
import * as voteServices from "./vote.service";

export const giveVote = catchAsync<VotingPayload>(async (req, res) => {
  const { email } = req.query;
  const candidateData = req.body;

  const data: any = await voteServices.vote(email, candidateData);
  console.log(data);

  if (data == "You have already voted") {
    sendResponse(res, {
      message: "You have already voted",
      data: null,
    });
  } else {
    sendResponse(res, {
      message: "Vote given successfully",
      data,
    });
  }
});
export const upcomingVoteController = catchAsync<VotePayload>(
  async (req, res) => {
    try {
      const data = await voteServices.upComingVoteServices();
      console.log("Data retrieved successfully:", data);

      sendResponse(res, {
        message: "Data retrieved successfully",
        data,
      });
    } catch (error: any) {
      console.error("Error retrieving data:", error);
    }
  }
);
