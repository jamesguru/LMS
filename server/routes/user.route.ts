import express from 'express';
import { activateUser, loginUser, logoutUser, registrationUser, updateAccessToken } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/registration',registrationUser);
userRouter.post('/activate-user',activateUser);
userRouter.post('/login',loginUser);
userRouter.post('/logout',isAuthenticated,authorizeRoles("admin"),logoutUser);
userRouter.get("/refresh",updateAccessToken);

export default userRouter;