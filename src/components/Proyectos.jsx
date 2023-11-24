
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

function Proyectos() {
    

    return (
        <>
        

        <TopBar page={'Proyectos'}/>
        <h1 className='px-96'>Proyectos Works!!!</h1>
         
        </>
    )
}

export default Proyectos