import mongoose from "mongoose";
// This used to delete tokens from the blacklist after 1 day
// The token will full database
const blackListTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // 1 day
    },
  },
  { timestamps: true }
);

export const blackListTokenModel = mongoose.model("BlackListToken", blackListTokenSchema);