import { UserModel } from '../models'; // Import from your consolidated models/index.ts or individual User.ts
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../config'; // Import JWT secret

/**
 * Creates a new user in the database.
 * @param username - The username for the new user.
 * @param password - The password for the new user (should be hashed in a real app).
 * @returns An object indicating success/failure and a message.
 */
export const createNewUser = async (username: string, password: string) => {
    try {
        const newUser = await UserModel.create({ username, password });
        return { success: true, message: "User signed up", user: newUser };
    } catch (e: any) {
        // Check for duplicate key error (MongoDB E11000)
        if (e.code === 11000) {
            return { success: false, message: "User already exists" };
        }
        console.error("Error in userService.createNewUser:", e);
        return { success: false, message: "Failed to sign up user" };
    }
};

/**
 * Authenticates a user and generates a JWT token.
 * @param username - The username to authenticate.
 * @param password - The password to authenticate (should be compared with hash in a real app).
 * @returns An object indicating success/failure and a token or message.
 */
export const authenticateUser = async (username: string, password: string) => {
    const existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
        // IMPORTANT: In a real application, you MUST hash the password (e.g., using bcrypt)
        // and compare the hashed password here, not plain text.
        const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
        return { success: true, token };
    } else {
        return { success: false, message: "Incorrect credentials" };
    }
};