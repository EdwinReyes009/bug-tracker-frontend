
import { removeJWT, decodedDataJWT, getJWT, decodedJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBug} from '@fortawesome/free-solid-svg-icons';
import CustomizedCheckbox from '../components/CustomizedCheckbox';
import TopBar from '../components/TopBar'
import { useEffect, useState } from 'react';

function Inicio() {

     const [elementos, setElementos] = useState([
    { id: 1, texto: ' Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.', seleccionado: false },
    { id: 2, texto: ' estándar de las industrias desde el año 1500, cuando un impresor', seleccionado: false },
    { id: 3, texto: ' Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el', seleccionado: false },
    { id: 4, texto: ' Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el', seleccionado: false },
    { id: 5, texto: ' Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el', seleccionado: false },
  ]);
    
  const manejarCambioCheckbox = (id) => {
    setElementos((prevElementos) =>
      prevElementos.map((elemento) =>
        elemento.id === id ? { ...elemento, seleccionado: !elemento.seleccionado } : elemento
      )
    );
  };

    return (
        <>

        <TopBar page={'Inicio'}/>
        

        

        <div>
             <h1 className='px-72 pt-12 pb-12 font-bold text-xl'>Bienvenido {decodedDataJWT().full_name}</h1>
        </div>

        <div className='flex'>

          <div className='ml-72 w-4/12 h-44 border-4 border-solid border-square-500 rounded-lg p-4'>
              
              <div className='flex pl-5 pr-5 justify-between'>
                 <h1 className=' pt-12 font-bold text-3xl'>0</h1>
                <FontAwesomeIcon icon={faBug} className='pt-10 text-5xl text-green-600'/>
              </div>

               
                <h1 className='pt-6 font-bold text-xl'>Errores pendientes</h1>   

         </div>



         <div className='ml-24 w-4/12 h-44 border-4 border-solid border-square-500 rounded-lg p-4'>
              <div className='flex pl-5 pr-5 justify-between'>
                 <h1 className=' pt-12 font-bold text-3xl'>0</h1>
                <FontAwesomeIcon icon={faBug} className='pt-10 text-5xl text-red-600'/>
              </div>

                <h1 className=' pt-6 pb-12 font-bold text-xl'>Errores resueltos</h1>
         </div>

        </div>

        <div className='flex pt-12' >
                <div className='ml-72 w-4/12 h-44 border-4 border-solid border-square-500 rounded-lg p-4 '>
                <h1 className=' pt-2 pb-12 font-bold text-xl'>Mis tareas que vencen hoy:</h1>

                </div>

                <div className='ml-24 w-4/12 h-44 border-4 border-solid border-square-500 rounded-lg p-4'>
                <h1 className=' pt-2 pb-12 font-bold text-xl'>Mis tareas atrasadas:</h1>
                </div>
        </div>
        <div className='flex pt-12 pb-12' >
                <div className='ml-72 w-[calc(75%-10px)] h-44 border-4 border-solid border-square-500 rounded-lg p-4 overflow-auto'>
                <h1 className=' pt-2 pb-3 font-bold text-xl'>Todos los errores:</h1>
                    <ul>
                        {elementos.map((elemento) => (
                            <li key={elemento.id}>
                                <input
                                    type="checkbox"
                                    checked={elemento.seleccionado}
                                    onChange={() => manejarCambioCheckbox(elemento.id)}
                                />
                                {elemento.texto}
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
         
        </>
    )
}

export default Inicio