import express from 'express';
import { Login, Register, AdminLogin } from '../controller/User_controller.js';

const UserRouter = express.Router();

UserRouter.post('/register', Register);
UserRouter.post('/login', Login);
UserRouter.post('/adminLogin', AdminLogin);

export default UserRouter;