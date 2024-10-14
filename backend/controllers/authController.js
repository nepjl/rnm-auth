import connexion from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userRegister = async (req, res) => {
    
    const { email, telephone, password } = req.body;
    console.log('Données reçues:', { email, telephone, password }); // Vérifie les données reçues
  
    try {
      const [rows] = await connexion.promise().query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
      if (rows.length > 0) {
        return res.status(409).json({ message: `Cet utilisateur existe déjà.` });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await connexion.promise().query('INSERT INTO utilisateurs (email, telephone, mot_de_passe) VALUES (?, ?, ?)', [email, telephone, hashPassword]);
      res.status(201).json({ message: `Utilisateur créé avec succès.` });
    } catch (erreur) {
      console.error(erreur); 
      res.status(500).json({ erreur: 'Erreur interne du serveur' });
    }
  };
  

  export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Données reçues:', { email, password });
  
    try {
      const [rows] = await connexion.promise().query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.status(404).json({ message: `Email ou mot de passe incorrect.` });
      }
      
      const utilisateur = rows[0];
      const isMatch = await bcrypt.compare(password, utilisateur.mot_de_passe);
      if (!isMatch) {
        return res.status(401).json({ message: `Mot de passe incorrect.` });
      }
  
      const token = jwt.sign({ id: utilisateur.id }, process.env.JWT_KEY, { expiresIn: "3h" });
      res.status(200).json({ token: token }); // Changer 201 en 200
    } catch (erreur) {
      console.error(`Erreur de connexion`, erreur);
      res.status(500).json({ erreur: 'Erreur interne du serveur' });
    }
  };
  
  
  

export const verifierToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Aucun token fourni' });
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Erreur interne du serveur'});
        
    }
}





