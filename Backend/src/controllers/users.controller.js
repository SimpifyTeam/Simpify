import { User } from "../models/users.model.js";
import { generateUsername } from "../utils/generateUsername.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { WorkOS } from "@workos-inc/node";

dotenv.config();

// Initialize WorkOS SDK with API key from environment variables
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

/**
 * Register a new user with basic email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with success message or error
 */
const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.create({ email });
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Generate authorization URL for WorkOS AuthKit authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with authorization URL or error
 */
const loginUser = async (req, res) => {
  try {
    // Create authorization URL for AuthKit
    const authorizationUrl = workos.userManagement.getAuthorizationURL({
      provider: "authkit",
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.WORKOS_CLIENT_ID,
    });

    res.json({ authorizationUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Handle OAuth callback and user authentication/creation
 * Supports special promotions based on date and sets subscription details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with authenticated user or error
 */
const authCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { gender, age, location, goal, communicationStyle } = req.query;

    console.log("Received request with code:", code);

    if (!code) {
      return res
        .status(400)
        .json({ error: "Authorization code is missing, Code is required" });
    }

    // Exchange the authorization code for user data using authenticateWithCode
    const authenticateResponse =
      await workos.userManagement.authenticateWithCode({
        clientId: process.env.WORKOS_CLIENT_ID,
        code,
        session: {
          sealSession: true,
          cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
        },
      });

    const { user, sealedSession } = authenticateResponse;

    // Store the session in a cookie
    res.cookie("wos-session", sealedSession, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    // Check if the user already exists in MongoDB
    let existingUser = await User.findOne({ workosId: user.id });

    // Check if the current date is March 31st
    const currentDate = new Date();
    const isMarch31st =
      currentDate.getMonth() === 2 && currentDate.getDate() === 31;

    // Calculate subscription expiry (30 days from now)
    const subscriptionExpiryDate = new Date();
    subscriptionExpiryDate.setDate(subscriptionExpiryDate.getDate() + 30);

    if (!existingUser) {
      // Generate a unique username
      const username = await generateUsername(
        user.firstName || "",
        user.lastName || ""
      );

      // Create a new user in the database
      existingUser = await User.create({
        workosId: user.id,
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username,
        avatar: user.profilePictureUrl || "",
        provider: user.provider || "authkit",
        gender,
        age,
        location,
        goal,
        communicationStyle,
        // Set premium and beta status based on date
        isPremium: !isMarch31st,
        betaTester: !isMarch31st,
        // Set subscription expiry date (30 days from now)
        subscriptionExpiryDate: !isMarch31st ? subscriptionExpiryDate : null,
      });
    } else {
      // Update user info if they already exist
      existingUser.gender = gender;
      existingUser.age = age;
      existingUser.location = location;
      existingUser.goal = goal;
      existingUser.communicationStyle = communicationStyle;

      // Update premium status if not March 31st
      if (!isMarch31st) {
        existingUser.isPremium = true;
        existingUser.betaTester = true;
        existingUser.subscriptionExpiryDate = subscriptionExpiryDate;
      }

      await existingUser.save();
    }

    // Return user info
    console.log("User Created Successfully");
    res.status(200).json({
      message: "User authenticated successfully",
      user: existingUser,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      error: error.message,
      errorMessage: error,
    });
  }
};

export { registerUser, loginUser, authCallback };
