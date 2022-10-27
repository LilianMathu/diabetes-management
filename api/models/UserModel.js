import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    residence: {
      type: String,
      required: true,
    },
    dateOfDiagnosis: {
      type: Date,
    },
    currentRegimen: {
      type: String,
      required: true,
    },
    clinic: {
      type: String,
    },
    pin: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
