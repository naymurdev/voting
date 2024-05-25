"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateInfosModel = void 0;
const constants_1 = require("../../constants");
const mongoose_1 = require("mongoose");
const candidateInfosModelSchema = new mongoose_1.Schema({
    country: {
        type: String,
        enum: constants_1.countries,
        required: true,
    },
    candidate: [
        {
            name: String,
            partyName: String,
            profileUrl: String,
        },
    ],
    voteEndDate: {
        required: true,
        type: String,
    },
    startDate: {
        required: true,
        type: String,
    },
}, { collection: "candidateInfos" });
exports.candidateInfosModel = (0, mongoose_1.model)("candidateInfos", candidateInfosModelSchema);
