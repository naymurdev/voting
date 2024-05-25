import { Types,Schema } from "mongoose";
import {  z } from "zod";
import { voteSchema } from "./vote.validation";

export type Vote = {
  userId?: Schema.Types.ObjectId;
  partyName:string
};


export type VotePayload = z.infer<typeof voteSchema>;
export type VotingPayload = {
  partyName: string;
};
