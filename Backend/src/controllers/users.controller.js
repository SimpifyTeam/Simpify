import { User } from "../models/users.model.js";
import dotenv from "dotenv";
import { WorkOS } from "@workos-inc/node";

dotenv.config();

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
  clientID: process.env.WORKOS_CLIENT_ID,
});

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
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: "authkit",
      redirectUri: process.env.REDIRECT_URI, // Use the correct redirect URI
      clientId: process.env.WORKOS_CLIENT_ID,
    });

    res.json({ authorizationUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Handle OAuth Callback
const authCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Authorization code is missing" });
    }

    // Exchange code for user profile data
    const { user } = await workos.userManagement.authenticate({
      clientId: process.env.WORKOS_CLIENT_ID,
      code,
    });

    // Extract user data
    const { id, email, firstName, lastName, profilePictureUrl, provider } =
      user;

    // Check if user exists in MongoDB
    let existingUser = await User.findOne({ workosId: id });

    if (!existingUser) {
      // Create a new user
      existingUser = await User.create({
        workosId: id,
        email,
        name: `${firstName} ${lastName}`,
        avatar: profilePictureUrl,
        provider,
      });
    }

    // Respond with user data (Modify to handle sessions or JWT if needed)
    res.status(200).json({ user: existingUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export controllers
export { registerUser, loginUser, authCallback };
