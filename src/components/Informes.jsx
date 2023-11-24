
import { removeJWT, decodedDataJWT } from '../services/jwt'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

function Informes() {
    

    return (
        <>
        <TopBar page={'Informes'}/>

        <h1 className='px-96'>Informes Works!!!</h1>
         
        </>
    )
}

export default Informes