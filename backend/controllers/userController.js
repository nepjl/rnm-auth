import { getUserById } from '../models/authModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.userId);
    console.log(`Utilisateur récupéré : `, user);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    return res.status(200).json({ utilisateur: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur du serveur survenue' });
  }
};

