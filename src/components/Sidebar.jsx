import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { removeJWT, decodedDataJWT } from '../services/jwt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faHouse, faClipboardList, faBarsProgress, faBug, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import logoSmall from '../assets/images/carpetaSmall.png'

function Sidebar() {
    const [showMenu, setShowMenu] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            {/* Sidebar */}
            <div className={`bg-yummy-800 text-white h-screen fixed shadow-md xl:left-0  shadow-gray-600 z-10 transition-all duration-400 ${showMenu ? 'left-0' : '-left-full'}`}>
           
           <div className='lg:text-xl px-12 py-6 flex items-center gap-4'>
          
           <FontAwesomeIcon className='pt-1 lg:text-2xl text-menu-500 ' icon={faBars} />

            <img src={logoSmall} alt="logo" style={{ width: '25px', height: '20px' }}/>

            <h1 className='font-bold text-white' >CodeFix</h1>

           </div>
           

                {/* Navigation */}
               <div className='p-8 pt-3 flex flex-col justify-between gap-5'>
                        
                    <nav className='flex flex-col gap-6'>
                        <Link
                            to='/home/inicio'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            {/* <MdDashboard /> */}
                            <FontAwesomeIcon icon={faHouse}/> 
                           Inicio
                        </Link>
                        <Link
                            to='/home/informes'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                               <FontAwesomeIcon icon={faClipboardList}/> 
                            Informes
                        </Link>
                        <Link
                            to='/home/calendario'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            Calendario
                        </Link>
                        <Link
                            to='/home/proyectos'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faBarsProgress} />
                            Proyectos
                        </Link>
                        <Link
                            to='/home/errores'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faBug} />
                            Errores
                        </Link>
                        <Link
                            onClick={() => { removeJWT() }}
                            to='/auth'
                            className='flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faSignOut} />
                            Logout
                        </Link>
                    </nav>
                    
                </div>
            </div> 

           
        </>
    )
}

export default Sidebar