import express from 'express';
import connexion from '../config/db.js';
import {userRegister, userLogin, verifierToken} from '../controllers/authController.js';

const Router = express.Router();

Router.post('/register', userRegister)
Router.post('/login', userLogin)
Router.get('/home', verifierToken, async (req, res)=>{
    try{
        
        const [rows] = await connexion.promise().query('SELECT * FROM utilisateurs WHERE id = ?', [req.uderId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: `Email ou mot de passe incorrect.` });
        }

        return res.status(201).json({utilisateur: rows[0]});
    }catch(e){
        console.log(e);
        res.status(500).json({message: 'Erreur du serveur survenue'});
    }
});

export default Router;