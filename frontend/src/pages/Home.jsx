// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log du token
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response:', response); // Log de la réponse

      if (response.status === 200) {
        setUser(response.data.utilisateur);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log('Erreur lors de la récupération de l\'utilisateur:', error);
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='justify-center box-content h-screen w-screen bg-gray-700'>
      <h1 className='text-5xl font-bold text-center text-white pt-20'>Bienvenue sur notre système d'authentification avec React, Node avec Express et MySQL</h1>
      <div className='justify-center h-80 w-auto shadow-3xl m-16 px-8 py-5 border rounded-2xl bg-slate-800'>
        <h1 className='text-3xl font-bold text-center text-white'>Bienvenue sur votre page de profil</h1>
        {user ? (
          <div className='text-lg text-center text-white'>
            <p>Voici votre email: {user.email}</p>
            <p>Voici votre numéro de téléphone: {user.telephone}</p>
            <button 
              onClick={handleLogout} 
              className='mt-36 bg-red-800 text-white font-bold p-2 rounded-lg cursor-pointer'
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <p className='text-lg text-center text-white'>Chargement des informations...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
