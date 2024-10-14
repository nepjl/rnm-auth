import connexion from '../config/db.js';

export const getUserById = async (userId) => {
  const [rows] = await connexion.promise().query('SELECT email, telephone FROM utilisateurs WHERE id = ?', [userId]);
  return rows[0]; // Retourne l'utilisateur trouvé
};
