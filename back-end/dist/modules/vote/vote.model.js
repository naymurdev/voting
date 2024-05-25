"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingModel = void 0;
const mongoose_1 = require("mongoose");
const votingModelSchema = new mongoose_1.Schema({
    partyName: {
        type: String,
        required: true,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
});
exports.VotingModel = (0, mongoose_1.model)("vote", votingModelSchema);
