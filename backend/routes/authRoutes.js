import express from 'express';
import { userRegister, userLogin, verifierToken } from '../controllers/authController.js';
import { getUserProfile } from '../controllers/userController.js';

const Router = express.Router();

Router.post('/register', userRegister);
Router.post('/login', userLogin);
Router.get('/home', verifierToken, getUserProfile); // Utilisation du nouveau contrôleur

export default Router;
