import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connexion.connect((erreur) => {
  if (erreur) {
    console.error('Erreur de connexion à la base de données:', erreur); // Log de l'erreur de connexion
    throw erreur;
  }
  console.log(`Connexion à la base de données MySQL avec succès.`);
});

export default connexion;
