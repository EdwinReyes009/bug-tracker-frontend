
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons';

function Bugs() {
  const [datos, setDatos] = useState([]);
  const params = useParams()
  const navigate = useNavigate()


  const getTickets = async () => {

    

      try {

        const data = await axios.get('http://localhost:8000/get_tickets');
        let result = data.data.msg

        if (data && !data.error) {
          setTimeout(() => {
            console.log('Obteniendo DATA')
            console.log(result[0]);
            setDatos(result);
          }, 1000)
        } else {
          setTimeout(() => {
            console.log('No hay DATA')
          }, 6000);
        }
      }
      catch (error) {
        // Manejar errores de red o errores en la promesa anterior
        console.error('Verifique su código', error.message);
      }
  };

  useEffect(() => {

    getTickets()

  }, [params]);

  return (
    <>
      <TopBar page={'Bugs'} />

      <div className='flex'>
        <h1 className='px-32 pt-5 pb-5 font-bold text-xl'>Select Bug:</h1>
        <button className='mt-4 ml-auto mr-7 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold'  onClick={() => navigate('/home/bug-add')}>Crear Nuevo</button>   
      </div>

      <hr className='border-gray-500' />

      <div className="flex flex-col pb-8 overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8 px-24">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm font-light text-center">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">SKU code</th>
                    <th scope="col" className="px-6 py-4">Title_of_Bug</th>
                    <th scope="col" className="px-6 py-4">Informer</th>
                    <th scope="col" className="px-6 py-4">Fecha_Creacion</th>
                    <th scope="col" className="px-6 py-4">Asignado(os)</th>
                    <th scope="col" className="px-6 py-4">Se_completo_el:</th>
                    <th scope="col" className="px-6 py-4">Fecha_de_vencimiento</th>
                    <th scope="col" className="px-6 py-4">Estado</th>
                    <th scope="col" className="px-6 py-4">Gravedad</th>
                    <th scope="col" className="px-6 py-4">Plataforma</th>
                    <th scope="col" className="px-6 py-4">Categoría</th>
                    <th scope="col" className="text-center pl-1">Acciones:</th>

                  </tr>
                </thead>
                <tbody>

                  {datos.map((fila, index) => (
                    <tr key={index}>
                      {Object.keys(fila).map((columna, columnIndex) => (
                        <td key={columnIndex}>{fila[columna]}</td>
                      ))}
                      {/* Celdas de botones en la columna "Acciones" */}
                      <td>
                        <button className="bg-yellow-500 text-white px-3 py-2 rounded" onClick={() => viewproject(fila.id)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                      <td>
                        <button className="bg-red-500 text-white px-3 py-2 rounded" onClick={() => {
                          const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar este bug?');

                          if (shouldDelete) {
                            delete_project(fila.id);
                          }
                        }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bugs