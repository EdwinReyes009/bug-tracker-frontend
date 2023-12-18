
import { removeJWT, decodedDataJWT, getJWT, decodedJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBug, faCalendarXmark, faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import CustomizedCheckbox from '../components/CustomizedCheckbox';
import TopBar from '../components/TopBar'
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Result } from 'postcss';


function Inicio() {

     const [elementos, setElementos] = useState([
    { id: 1, texto: ' Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', seleccionado: false },
    { id: 2, texto: ' estándar de las industrias desde el año 1500, cuando un impresor', seleccionado: false },
    { id: 3, texto: ' Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el', seleccionado: false },
    { id: 4, texto: ' Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el', seleccionado: false },
    { id: 5, texto: ' Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el', seleccionado: false },
  ]);

  const [datos, setDatos] = useState([]);
    
  const manejarCambioCheckbox = (id) => {
    setElementos((prevElementos) =>
      prevElementos.map((elemento) =>
        elemento.id === id ? { ...elemento, seleccionado: !elemento.seleccionado } : elemento
      )
    );
  };

  async function get_tareas() {
          
    const id_user = decodedDataJWT().id;

   
      
    const data = await axios.get(`http://localhost:8000/get_tareas_user?id_user=${id_user}`);
    let result = data.data
          if (!data.error) {  
            setDatos(result);
                           
          }
      
  }

    
    useEffect(() => {
      

       get_tareas()
      return () => { }
  },[])
  
  



    return (
        <>

        <TopBar page={'Inicio'}/>
        
        <div>
             <h1 className='px-48 pt-8 pb-8 font-bold text-xl'>Bienvenido {decodedDataJWT().full_name}</h1>
        </div>

        <div className='flex'>

          <div className='w-1/2 h-44 ml-48 lg:w-4/12 border-4 border-solid border-square-500 rounded-lg p-4'>
              
              <div className='flex pl-5 pr-5 justify-between'>
                 <h1 className=' pt-12 font-bold text-3xl'>{datos.find(item => item.tipo === 'pendientes')?.cantidad}</h1>
                <FontAwesomeIcon icon={faBug} className='pt-10 text-5xl text-green-600'/>
              </div>
                <h1 className='pt-6 font-bold text-xl'>Errores pendientes</h1>   
         </div>

         <div className='ml-16 w-1/2 h-44 lg:w-4/12  border-4 border-solid border-square-500 rounded-lg p-4'>
              <div className='flex pl-5 pr-5 justify-between'>
                 <h1 className=' pt-12 font-bold text-3xl'>{datos.find(item => item.tipo === 'resueltos')?.cantidad}</h1>
                <FontAwesomeIcon icon={faBug} className='pt-10 text-5xl text-red-600'/>
              </div>

                <h1 className=' pt-6 pb-12 font-bold text-xl'>Errores resueltos</h1>
         </div>

        </div>

        <div className='flex pt-12' >
                <div className='w-1/2 h-44 ml-48 lg:w-4/12 border-4 border-solid border-square-500 rounded-lg p-4 '>
              <div className='flex'>
              <h1 className=' pt-2 pb-12 font-bold text-xl'>Mis tareas que vencen hoy:</h1>
                <FontAwesomeIcon icon={faCalendarDay} className='pt-10 pl-20 text-5xl text-yellow-600'/>
              </div>
                
                <h1 className='font-bold text-3xl'>{datos.find(item => item.tipo === 'hoy')?.cantidad}</h1>
                </div>

                <div className='ml-16 w-1/2 h-44 lg:w-4/12 border-4 border-solid border-square-500 rounded-lg p-4'>
               
               <div className='flex'>
               <h1 className=' pt-2 pb-12 font-bold text-xl'>Mis tareas atrasadas:</h1>
                <FontAwesomeIcon icon={faCalendarXmark} className='pt-10 pl-32 text-5xl text-orange-600'/>
               </div>
             
                <h1 className='font-bold text-3xl'>{datos.find(item => item.tipo === 'atrasados')?.cantidad}</h1>

                </div>
        </div>
         
        </>
    )
}

export default Inicio