
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import { useState, useEffect } from 'react';


function Errores() {
    const [datos, setDatos] = useState([]);

    //Uso de sessionStorage para guardar los datos y que no se haga la petición cada vez que se navege a la página    
    const TBLTktData = sessionStorage.getItem('tblTicketData');

    const getTickets = async () => {

      if (TBLTktData) {
        // Utiliza los datos almacenados en la caché
        const ticketData = JSON.parse(TBLTktData);
        // Actualiza tu estado local con ticketData
        setDatos(ticketData);
      }else{

          try {

          const data = await axios.get('http://localhost:8000/get_tickets');
          let result = data.data.msg
    
          if (data && !data.error) {
              setTimeout(() => {
              console.log('Obteniendo DATA')
              console.log(result[0]);
              sessionStorage.setItem('tblTicketData', JSON.stringify(result))
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
      } 
      };

  useEffect(() => {
    
    getTickets()
    
  }, []);

    return (
        <>
         <TopBar page={'Errores'}/>
       
         <div>
             <h1 className='px-32 pt-5 pb-5 font-bold text-xl'>Seleccionar Bug:</h1>
        </div>

        <hr className='border-gray-500'/>
         
        <div className="flex flex-col pb-8 overflow-x-auto">
  <div className="sm:-mx-6 lg:-mx-8 px-24">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm font-light text-center">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">SKU code</th>
              <th scope="col" className="px-6 py-4">Titulo_del_Bug</th>
              <th scope="col" className="px-6 py-4">Informador</th>
              <th scope="col" className="px-6 py-4">Fecha_Creacion</th>
              <th scope="col" className="px-6 py-4">Asignado(os)</th>
              <th scope="col" className="px-6 py-4">Se_completo_el:</th>
              <th scope="col" className="px-6 py-4">Fecha_de_vencimiento</th>
              <th scope="col" className="px-6 py-4">Estado</th>
              <th scope="col" className="px-6 py-4">Gravedad</th>
              <th scope="col" className="px-6 py-4">Plataforma</th>
              <th scope="col" className="px-6 py-4">Categoría</th>    
            </tr>
          </thead>
          <tbody>
            
          {datos.map((fila, index) => (
          <tr key={index}>
            {Object.keys(fila).map((columna, columnIndex) => (
              <td key={columnIndex}>{fila[columna]}</td>
            ))}
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

export default Errores