
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

function Errores() {
    

    return (
        <>
         <TopBar page={'Errores'}/>
        <h1 className='px-96'>Errores Works!!!</h1>
         
        </>
    )
}

export default Errores