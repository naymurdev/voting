import { countries } from "../../constants";
import { Schema, model } from "mongoose";
import { Vote } from "./vote.interface";

const votingModelSchema = new Schema<Vote>(
  {
    partyName: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
);

export const VotingModel = model("vote", votingModelSchema);
