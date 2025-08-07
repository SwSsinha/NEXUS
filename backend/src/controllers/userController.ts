import { Request, Response, NextFunction } from 'express';
import { createNewUser, authenticateUser } from '../services/userService';
import zod from "zod";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

// Define the Zod schema for the signup request body
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
});

// Define the Zod schema for the signin request body
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Zod validation to ensure a valid request body
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    const { username, password, firstName, lastName } = req.body;

    try {
        // 2. Password Hashing: Hash the password before sending it to the service
        // Salt is a random string added to the password to make it more secure
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Call the service layer with the hashed password and all user data
        const result = await createNewUser(username, hashedPassword, firstName, lastName);

        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            // Updated status code to 409 Conflict
            res.status(409).json({ message: result.message });
        }
    } catch (e) {
        console.error("Signup error:", e);
        res.status(500).json({ message: "An internal server error occurred during signup" });
    }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Zod validation for the signin request body
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    const { username, password } = req.body;

    try {
        // 2. Call the service layer to authenticate the user
        const result = await authenticateUser(username, password);

        if (result.success) {
            res.json({ token: result.token });
        } else {
            res.status(403).json({ message: result.message });
        }
    } catch (e) {
        console.error("Signin error:", e);
        res.status(500).json({ message: "An internal server error occurred during signin" });
    }
};
