"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingModel = void 0;
const constants_1 = require("../../constants");
const mongoose_1 = require("mongoose");
const votingModelSchema = new mongoose_1.Schema({
    country: {
        type: String,
        enum: constants_1.countries,
        required: true,
    },
    votingStart: {
        required: true,
        type: String,
    },
}, { collection: "upcomingVotings" });
exports.VotingModel = (0, mongoose_1.model)("upcomingVoting", votingModelSchema);
