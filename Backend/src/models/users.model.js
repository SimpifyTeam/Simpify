import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "Others", "Prefer not to say"],
      required: [true, "gender is required"],
    },
    age: {
      type: Number,
    },
    location: {
      type: String,
    },
    goal: {
      type: String,
    },

    preferences: {
      type: Schema.Types.Mixed,
      default: {},
    },
    tokens: {
      type: Number,
      required: [true, "Token cannot be null"],
      default: 100,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    subscriptionExpiryDate: {
      type: Date,
    },
    workosId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
