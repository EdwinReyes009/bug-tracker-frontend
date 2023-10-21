
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()
    

    const signOut = async () => {

        localStorage.removeItem('JWT_YUMMT')

        setTimeout(() => {
            navigate('/')
            }, 2000)

       
        console.log('saliendo de sesion') 
    };

    return (
        <>
          
        <h1>Dashboard</h1>
        <button 
        className='w-40 h-12 active:scale-[.98] active:duration-75 
        hover:scale-[1.01] ease-in-out transition-all py-3
        rounded-xl bg-yummy-800 text-white text-lg font-bold' 
        onClick={() => { signOut(); }}>Sign out </button>
             
         
        </>
    )
}

export default Dashboard