import { Request, Response } from 'express';
import { createNewUser, authenticateUser } from '../services/userService'; // Importing service functions

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // TODO: Implement Zod validation for username and password here

    const result = await createNewUser(username, password); // Calling the service function

    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(411).json({ message: result.message });
    }
};

export const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // TODO: Implement Zod validation for username and password here

    const result = await authenticateUser(username, password); // Calling the service function

    if (result.success) {
        res.json({ token: result.token });
    } else {
        res.status(403).json({ message: result.message });
    }
};
