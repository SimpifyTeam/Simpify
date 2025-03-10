import { User } from "../models/users.model.js";
import { generateUsername } from "../utils/generateUsername.js";
import dotenv from "dotenv";
import { WorkOS } from "@workos-inc/node";

dotenv.config();

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

// 🔹 Register User (If manually adding users)
const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.create({ email });
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Generate Login URL for OAuth
const loginUser = async (req, res) => {
  try {
    const authorizationUrl = workos.sso.getAuthorizationUrl({
      provider: "authkit",
      redirectUri: process.env.REDIRECT_URI, // Ensure this matches WorkOS settings
      clientId: process.env.WORKOS_CLIENT_ID,
    });
    res.json({ authorizationUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 OAuth Callback Handler (Using WorkOS SDK)
const authCallback = async (req, res) => {
  try {
    const { code, gender, age, location, goal } = req.query;
    console.log("Received request with code:", req.query.code);

    if (!code) {
      return res
        .status(400)
        .json({ error: "Authorization code is missing, Code is required" });
    }

    // Exchange authorization code for a WorkOS profile
    const { profile } = await workos.sso.getProfileAndToken({ code, clientId });

    const { id, email, first_name, last_name, profile_picture_url, provider } =
      profile;

    // Check if the user already exists in MongoDB
    let existingUser = await User.findOne({ workosId: id });

    if (!existingUser) {
      // Generate a unique username
      const username = await generateUsername(first_name, last_name);

      // Create a new user in the database
      existingUser = await User.create({
        workosId: id,
        email,
        firstName: first_name,
        lastName: last_name,
        username,
        avatar: profile_picture_url,
        provider,
        gender,
        age,
        location,
        goal,
      });
    } else {
      // Update user info if they already exist
      existingUser.gender = gender;
      existingUser.age = age;
      existingUser.location = location;
      existingUser.goal = goal;
      await existingUser.save();
    }

    req.session.user = existingUser;

    res.status(200).json({
      message: "User authenticated successfully",
      user: existingUser,
    });
  } catch (error) {
    //console.error("Error in /users/callback:", error);
    res.status(500).json({
      error: error.message,
      errorMessage: error,
    });
  }
};

export { registerUser, loginUser, authCallback };
