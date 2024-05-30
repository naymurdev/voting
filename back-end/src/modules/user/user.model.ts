import { hash } from "bcrypt";
import { Schema, model } from "mongoose";
import { countries } from "../../constants";
import { User } from "./user.interface";
import { generateUserId } from "./user.utils";

const userModelSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value >= 18;
        },
        message: "You must be at least 18 years old to register.",
      },
    },
    password: { type: String, required: true },
    userId: { type: String, unique: true },
    country: { type: String, default: "albania" },
    voted: {
      vote: {
        type: Boolean,
        default: false,
      },
      partyName: String,
      candidateName: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, { password, updatedAt, __v, ...rest }) => rest,
    },
  }
);

userModelSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);

  this.userId = await generateUserId("albania");

  next();
});

export const UserModel = model("user", userModelSchema);
