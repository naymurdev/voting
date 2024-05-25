import { Types,Schema } from "mongoose";
import {  z } from "zod";
import { voteSchema } from "./vote.validation";

export type Vote = {
  userId?: Schema.Types.ObjectId;
  partyName:string
};

