// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const fetchUser = async () =>{
      try{
        const token = localStorage.getItem('token')
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get('http://localhost:3000/auth/home', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if(response.status !== 201){
            navigate('/login')
        }
      }catch(erreur){
        // navigate('/login')
        console.log(erreur)
      }
    }

  useEffect(()=> {
    fetchUser()
  }, [])

  return (
      <>
        <div className='justify-center box-content h-screen w-screen bg-gray-700'>
          <h1 className='text-5xl font-bold text-center text-white pt-6'>Bienvenue sur notre site Web</h1>
            <div className=' justify-center h-96 w-auto shadow-3xl m-16 px-8 py-5 border rounded-2xl bg-slate-800'>
              <h1 className='text-3xl font-bold text-center text-white'>Bienvenue sur votre page de profil</h1>
              <p className='text-lg text-center text-white'>Il s&apos;agit d&apos;une application React simple avec tailwindcss que
                 j&lsquo;ai réussi à faire en regardant un tuto.</p>
            </div>
        </div>
      </>
  )
}

export default Home