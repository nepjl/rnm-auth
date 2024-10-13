/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    telephone: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Valeurs à envoyer:', values); 
    try {
      const response = await axios.post('http://localhost:3000/auth/register', values)
      // console.log(response.data);
      if(response.status === 201){
          navigate('/login');
      }
    } catch (erreur) {
      console.error(`Erreur lors de l'inscription:`, erreur);
      alert(`Erreur lors de l'inscription`);
    } 
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-slate-400'>
        <div className='flex flex-col shadow-2xl px-8 py-5 border w-96 rounded-2xl gap-2 bg-white'>
          <h2 className='text-3xl text-blue-600 font-bold text-center mb-3'>S&apos;inscrire</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-500'>Votre email</label>
              <input type="email" placeholder='Ex: email@contact.com' className='w-full px-2 py-2 border rounded-md' name='email' onChange={handleChange}/>
            </div>
            <div className='mb-4'>
              <label htmlFor="telephone" className='block text-gray-500'>Votre numéro de téléphone</label>
              <input type="tel" placeholder='Ex: +24166010203' className='w-full px-2 py-2 border rounded-md' name='telephone' onChange={handleChange}/>
            </div>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-500'>Votre mot de passe</label>
              <input type="password" placeholder='Entrez votre mot de passe' className='w-full px-2 py-2 border rounded-md' name='password' onChange={handleChange}/>
            </div>
            <button className='w-full bg-green-800 text-white font-bold p-2 rounded-lg cursor-pointer'>Envoyez</button>
          </form>
          <div className='flex gap-4 text-center'>
            <span>Vous avez déjà un compte ?</span>
            <Link to='/login' className='text-blue-500 underline'>Se connecter</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
