import { Router } from 'express';
import { userMiddleware } from '../middleware/userMiddleware';

// Import all your controller functions
import { signup, signin } from '../controllers/userController';
import { addContent, getContent, deleteContent } from '../controllers/contentController';
import { shareBrain, getSharedBrain } from '../controllers/brainController';

const router = Router();

// User routes
router.post("/v1/signup", signup);
router.post("/v1/signin", signin);

// Content routes
router.post("/v1/content", userMiddleware, addContent);
router.get("/v1/content", userMiddleware, getContent);
router.delete("/v1/content", userMiddleware, deleteContent);

// Brain routes
router.post("/v1/brain/share", userMiddleware, shareBrain);
router.get("/v1/brain/:shareLink", getSharedBrain);

export default router;