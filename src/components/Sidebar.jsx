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
           <div className={`bg-yummy-800 text-white h-screen pt-6 pl-6 pr-5 fixed  shadow-md z-5 transition-all duration-400 ${showMenu ? 'left-0' : '-left-full'}`}>
           
           <div className='lg:text-xl flex items-center gap-4'>
          
          <button onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon className=' lg:text-3xl text-menu-500  ' icon={faBars} />
          </button>

            <img src={logoSmall} alt="logo" style={{ width: '35px', height: '30px' }}/>

            <h1 className='font-bold text-white' >CodeFix</h1>

           </div>
                {/* Navigation */}
               <div className='pl-1  pt-10 flex flex-col justify-between gap-5'>
                        
                    <nav className='flex flex-col gap-6'>
                        <Link
                            to='/home/inicio'
                            className={`flex items-center gap-10 text-white py-3  rounded-xl hover:bg-yummy-600 transition-colors lg:text-base ${showMenu ? '' : 'lg:text-opacity-0'}`}>
                            {/* <MdDashboard /> */}
                            <FontAwesomeIcon icon={faHouse}/> 
                           Inicio
                        </Link>
                        <Link
                            to='/home/informes'
                            className='flex items-center gap-10 text-white py-3 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                               <FontAwesomeIcon icon={faClipboardList}/> 
                            Informes
                        </Link>
                        <Link
                            to='/home/calendario'
                            className='flex items-center gap-10 text-white py-3 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            Calendario
                        </Link>
                        <Link
                            to='/home/proyectos'
                            className='flex items-center gap-10 text-white py-3 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faBarsProgress} />
                            Proyectos
                        </Link>
                        <Link
                            to='/home/errores'
                            className='flex items-center gap-10 text-white py-3 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faBug} />
                            Errores
                        </Link>
                        <Link
                            onClick={() => { removeJWT() }}
                            to='/auth'
                            className='flex items-center gap-10 text-white py-3 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                            <FontAwesomeIcon icon={faSignOut} />
                            Logout
                        </Link>
                    </nav>
                    
                </div>
            </div> 

        {/* Botón de toggle para mostrar el menú en pantallas pequeñas */}
        {!showMenu && (
        <div className='fixed h-screen w-20 bg-yummy-800 shadow-lg'>

            <button onClick={() => setShowMenu(true)}>
            <FontAwesomeIcon className='pt-6 pl-6 lg:text-3xl text-menu-500 ' icon={faBars} />
            </button>

              {/* Navigation */}
              <div className='pl-1  pt-10 flex flex-col justify-between gap-5'>
                        
                        <nav className='flex flex-col gap-6'>
                            <Link
                                to='/home/inicio'
                                className={` text-white py-3 pl-6  rounded-xl hover:bg-yummy-600 transition-colors lg:text-base `}>
                                {/* <MdDashboard /> */}
                                <FontAwesomeIcon icon={faHouse}/> 
                             
                            </Link>
                            <Link
                                to='/home/informes'
                                className=' text-white py-3 pl-6 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                                   <FontAwesomeIcon icon={faClipboardList}/> 
                          
                            </Link>
                            <Link
                                to='/home/calendario'
                                className='text-white py-3 pl-6 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                
                            </Link>
                            <Link
                                to='/home/proyectos'
                                className='text-white py-3 pl-6 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                                <FontAwesomeIcon icon={faBarsProgress} />
                                
                            </Link>
                            <Link
                                to='/home/errores'
                                className='text-white py-3 pl-6 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                                <FontAwesomeIcon icon={faBug} />
                                
                            </Link>
                            <Link
                                onClick={() => { removeJWT() }}
                                to='/auth'
                                className='text-white py-3 pl-6 rounded-xl hover:bg-yummy-600 transition-colors lg:text-base'>
                                <FontAwesomeIcon icon={faSignOut} />
                           
                            </Link>
                        </nav>
                        
                    </div>
        </div>
        )}
           
        </>
    )
}

export default Sidebar