"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upComingVoteServices = exports.vote = void 0;
const vote_model_1 = require("./vote.model");
const user_model_1 = require("../user/user.model");
const candidates_model_1 = require("../../modules/candidate/candidates.model");
function vote(user_email, candidate) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const checkingCandidate = yield candidates_model_1.candidateInfosModel.findOne({
            "candidate.name": candidate === null || candidate === void 0 ? void 0 : candidate.candidateName,
            "candidate.partyName": candidate === null || candidate === void 0 ? void 0 : candidate.partyName,
        });
        if (!checkingCandidate)
            throw new Error("Invalid Candidate");
        const user = yield user_model_1.UserModel.findOne({ email: user_email });
        console.log(user);
        if ((_a = user === null || user === void 0 ? void 0 : user.voted) === null || _a === void 0 ? void 0 : _a.vote) {
            return "You have already voted";
        }
        else {
            const result = yield user_model_1.UserModel.findOneAndUpdate({ email: user_email }, {
                voted: {
                    vote: true,
                    partyName: candidate === null || candidate === void 0 ? void 0 : candidate.candidateName,
                    candidateName: candidate === null || candidate === void 0 ? void 0 : candidate.partyName,
                },
            }, {
                new: true,
            });
            return result;
        }
    });
}
exports.vote = vote;
function upComingVoteServices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield vote_model_1.VotingModel.find();
            console.log(result);
            return result;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.upComingVoteServices = upComingVoteServices;
