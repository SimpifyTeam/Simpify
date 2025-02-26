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
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others", "Prefer not to say"],
    },
    communicationStyle: {
      type: String,
      enum: ["Casual", "Formal", "Direct", "Detailed", "Concise"],
      default: "Casual",
    },
    age: {
      type: mongoose.Schema.Types.Mixed,
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
    betaTester: {
      type: Boolean,
      default: false,
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

userSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(this.email)) {
      return next(new Error("Please provide a valid email address"));
    }
  }
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
