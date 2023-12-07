import { Navigate, Route, Routes } from 'react-router-dom'
import Inicio from '../components/Inicio'
import Informes from '../components/Informes'
import Calendario from '../components/Calendario'
import Proyectos from '../components/Proyectos'
import Errores from '../components/Errores'
import { expiredJWT } from '../services/jwt'
import LoginForm from '../components/LoginForm'
import Sidebar from '../components/Sidebar'
import ProjectDetail from '../components/ProjectDetail'

import { useState } from 'react'

function Home() {

    const [pageSelected, setPageSelected] = useState('Inicio')

    

    return (
        <>
            {
                !expiredJWT() ? (
                    <>
                        <div className='grid grid-cols-6 min-h-screen overflow-y-scroll bg-slate-50'>
                            <Sidebar />
                            
                            <div className='col-span-full '> {/* Nuevo contenedor para el contenido principal */}
                            {/* <TopBar page={pageSelected}/> */}
                            <Routes>
                                <Route path='/' element={<Navigate to='/home/inicio' />} />
                                <Route path='/inicio' element={<Inicio />} />
                                <Route path='/informes' element={<Informes />} />
                                <Route path='/calendario' element={<Calendario />} />
                                <Route path='/proyectos' element={<Proyectos />} />
                                <Route path='/project-detail/:id' element={<ProjectDetail />} />
                                <Route path='/project-add' element={<ProjectDetail />} />
                                <Route path='/errores' element={<Errores />} />
                                <Route path='/auth/sign_in' element={<LoginForm />} />
                                <Route path='/*' element={<Navigate to='/not-found' />} />
                            </Routes>
                            </div>

                       </div>
                    
                    </>
                    
                    
                ) : (
                    <Navigate to='/auth/sign_in' />
                )
            }
        </>
    )
}

export default Home
