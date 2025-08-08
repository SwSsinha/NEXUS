import { ContentModel } from '../models/Content'; // Import from your consolidated models/index.ts
import { LinkModel } from '../models/Link';
import { UserModel } from '../models/User'; // Import the updated UserModel
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../config';
import bcrypt from 'bcryptjs'; // Import bcrypt for comparison

/**
 * Creates a new user in the database with a pre-hashed password.
 * @param username - The username for the new user.
 * @param hashedPassword - The securely hashed password for the new user.
 * @param firstName - The first name of the new user.
 * @param lastName - The last name of the new user.
 * @returns An object indicating success/failure and a message.
 */
export const createNewUser = async (username: string, hashedPassword: string, firstName: string, lastName: string) => {
    try {
        const newUser = await UserModel.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });
        return { success: true, message: "User signed up", user: newUser };
    } catch (e: any) {
        if (e.code === 11000) {
            return { success: false, message: "User already exists" };
        }
        console.error("Error in userService.createNewUser:", e);
        return { success: false, message: "Failed to sign up user" };
    }
};

/**
 * Authenticates a user by comparing the provided password with the stored hash.
 * @param username - The username to authenticate.
 * @param password - The plaintext password to authenticate.
 * @returns An object indicating success/failure and a token or message.
 */
export const authenticateUser = async (username: string, password: string) => {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
        // Compare the provided password (plaintext) with the hashed password from the database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
            return { success: true, token };
        }
    }
    return { success: false, message: "Incorrect credentials" };
};

/**
 * Gets a user's profile information by user ID.
 * @param userId - The ID of the user to fetch.
 * @returns An object indicating success/failure and user data or message.
 */
export const getUserProfile = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).select('-password');
        
        if (!user) {
            return { success: false, message: "User not found" };
        }

        return { success: true, user };
    } catch (e) {
        console.error("Error in userService.getUserProfile:", e);
        return { success: false, message: "Failed to fetch user profile" };
    }
};

/**
 * Updates a user's profile information.
 * @param userId - The ID of the user to update.
 * @param firstName - The new first name.
 * @param lastName - The new last name.
 * @returns An object indicating success/failure and updated user data or message.
 */
export const updateUserProfile = async (userId: string, firstName: string, lastName: string) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { firstName, lastName },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return { success: false, message: "User not found" };
        }

        return { success: true, message: "Profile updated successfully", user: updatedUser };
    } catch (e) {
        console.error("Error in userService.updateUserProfile:", e);
        return { success: false, message: "Failed to update profile" };
    }
};

/**
 * Updates a user's password.
 * @param userId - The ID of the user to update.
 * @param currentPassword - The current password for verification.
 * @param newPassword - The new password to set.
 * @returns An object indicating success/failure and message.
 */
export const updateUserPassword = async (userId: string, currentPassword: string, newPassword: string) => {
    try {
        const user = await UserModel.findById(userId);
        
        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Verify current password
        const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordCorrect) {
            return { success: false, message: "Current password is incorrect" };
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        await UserModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

        return { success: true, message: "Password updated successfully" };
    } catch (e) {
        console.error("Error in userService.updateUserPassword:", e);
        return { success: false, message: "Failed to update password" };
    }
};
