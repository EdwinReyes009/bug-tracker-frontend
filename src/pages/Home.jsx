import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import { expiredJWT } from '../services/jwt'
import LoginForm from '../components/LoginForm'

function Home() {
    return (
        <>
            {
                !expiredJWT() ? (
                    <div className='grid grid-cols-6 min-h-screen overflow-y-scroll bg-slate-50'>
                        
                        {/* <Dashboard /> */}

                        <Routes>
                                <Route path='/' element={<Navigate to='/home/dashboard' />} />
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/auth/sign_in' element={<LoginForm />} />
                                <Route path='/*' element={<Navigate to='/not-found' />} />
                            </Routes>
                    </div>
                ) : (
                    <Navigate to='/auth/sign_in' />
                )
            }
        </>
    )
}

export default Home
