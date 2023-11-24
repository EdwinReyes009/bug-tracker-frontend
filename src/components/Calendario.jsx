
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

function Calendario() {
    
    return (
        <>
        <TopBar page={'Calendario'}/>

        <h1 className='px-96'>Calendario Works!!!</h1>
         
        </>
    )
}

export default Calendario