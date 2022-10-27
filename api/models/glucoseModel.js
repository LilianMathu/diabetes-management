import { Schema, model } from "mongoose";

const readingsSchema = new Schema(
  {
    reading: {
      type: String,
    },
    time: {
      type: Date,
    },
    food: {
      type: String,
    },
    mood: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Reading", readingsSchema);
