import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Input } from '@mui/material'
import { InputAdornment } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import { BiCalendar, BiUser, BiCalendarCheck, BiText, BiTrash, BiStats, BiArrowBack } from 'react-icons/bi'
import { ImBoxAdd } from 'react-icons/im'
import { HiArrowCircleUp } from 'react-icons/hi'
import { status_project } from '../services/status_project'
import Rating from '@mui/material/Rating'
import { Alert } from '@mui/material'
import axios from 'axios'
import TopBar from './TopBar'
import {  decodedDataJWT } from '../services/jwt'

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function ProjectDetail() {
    const params = useParams()
    const [valueDate, setValueDate] = useState(dayjs('2022-04-17'));
    const navigate = useNavigate()
    const [successAlert, setSuccessAlert] = useState(false)
    const [project, setProject] = useState({
        id: '',
        name: '',
        description: '',
        due_date: '',
        end_date: '',
        id_user: '',
        id_dev: '',
        id_status_project: 0,
    })
   
    useEffect(() => {
        async function get_project() {
            const id = params.id
            if (id) {
                const body = {
                    id: id
                }
                const data = await axios.get('http://localhost:8000/get_project_by_id', body);
               
                if (!data.error) {
                    setProject(data.data.msg)
                }
            }
        }

        get_project()
        return () => { }
    }, [params])

    const put_update_project = async () => {
        const data = await axios.post('http://localhost:8000/update_project', project);

        if (!data.error) {
            setProject(data.data.msg)
            setSuccessAlert(true)
            setTimeout(() => {
                setSuccessAlert(false)
            }, 5000)
        }
    }

    const post_create_project = async () => {

        // Supongamos que 'project' tiene la siguiente estructura:
        const id_user = {
            id_user: decodedDataJWT.fullname, 
        };
       
        const addIdUser = { ...project, id_user: id_user };

        // Realizar la solicitud POST con el objeto modificado
        const data = await axios.post('http://localhost:8000/create_project', addIdUser);

        // const data = await axios.post('http://localhost:8000/create_project', project) 
        console.log(data)

        if (!data.error) {
           
            setTimeout(() => {
                navigate(`/proyectos`)
            }, 2000)
        } else {
           console.error('No se ha podido crear el proyecto')
        }
    }

    const delete_project = async () => {
        const body = {
            id: project.id
        }
        const data = await axios.post('http://localhost:8000/delete_project', body) 

        if (!data.error) {
           
            setTimeout(() => {
                navigate(`/home/dishes`)
            }, 2000)
        } else {
            console.error('No se ha podido eliminar el proyecto')
        }
    }

    const valid_form = () => {
        if (project.name == '' || project.description == '' || project.due_date == '' || project.id_user == '' || project.id_dev == '' || project.id_status_project == 0)
            return true

        return false
    }


    return (
        <>
            <TopBar page={'Crear Nuevo Proyecto'}  className='w-full'/>

            <div className='flex flex-col gap-6'>
                {
                    params.id ? (
                        <div className='flex justify-between'>
                            <h1 className='text-2xl'>ID Project Detaild: <span className='text-lg font-bold font-montserrat'>{project.id}</span></h1>
                            <button className='flex items-center justify-center gap-1 text-sm bg-yummy-800 text-white px-3 py-2 rounded-full hover:bg-yummy-600 transition-all shadow-lg disabled:bg-yummy-600' onClick={() => put_update_project()} disabled={valid_form()}>Update <ImBoxAdd /></button>
                        </div>
                    ) : (
                        <div className='flex justify-between'>
                            <h1 className='px-32 pt-5 pb-5 font-bold text-xl'>Información del proyecto</h1>
                         
                            <button className='mt-4 ml-auto mr-3 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black'onClick={() => post_create_project()} disabled={valid_form()}>Crear Nuevo</button>   
                            <button className=' mt-4 ml-1 mr-7 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black'onClick={() => navigate(`/home/proyectos`) } >Regresar <BiArrowBack /></button>   

                        </div>
                    )
                }
                <div className='px-32'>
                    <div className='col-span-1 flex flex-col gap-4'>
                        {
                            params.id ? (
                                <div className='flex flex-col'>
                                    <span className='text-[12px] text-gray-500'>Rating:</span>
                                    <div className='flex gap-1 items-center'>
                                        <span className='text-5xl'>{project.rating}</span>
                                        <Rating name="read-only" value={project.rating} readOnly />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                <div className='flex flex-col gap-8'>
                        
                        <div className='grid grid-cols-2 gap-6'>

                        <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Nombre
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <BiText />
                                </InputAdornment>
                            }
                            value={project.name}
                            onChange={event => setProject({ ...project, name: event.target.value })}
                            placeholder={"Escribe el nombre del proyecto aquí"}
                            error={!(project.name)}
                            />
                        </FormControl>

                        </div>

                        <TextField 
                        variant="standard"
                        value={project.description} 
                        rows={7} 
                        multiline
                        label='Description' 
                        onChange={event => setProject({ ...project, description: event.target.value })} 
                        placeholder='Write Description Here...'
                        helperText={
                            !(project.description)
                            ?"Description is required"
                            :""
                        }
                        error={!(project.description)}
                        />
                        
                        <div className='grid grid-cols-4 gap-20 mt-8'>
                            <FormControl variant="standard">
                                {/* <InputLabel htmlFor="input-with-icon-adornment">
                                    Fecha de Entrega:
                                </InputLabel> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    
                                        <DatePicker
                                            label="Fecha de Entrega:"
                                            value={valueDate}
                                            onChange={(newValue) => setValueDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>

                            <FormControl variant="standard">
                               
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    
                                        <DatePicker
                                            label="Fecha de Completado:"
                                            value={valueDate}
                                            onChange={(newValue) => setValueDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>

                            
                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                 id_dev:
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <BiUser />
                                        </InputAdornment>
                                    }
                                   type='text'
                                    value={project.id_dev}
                                    onChange={event => setProject({ ...project, id_dev: event.target.value })}
                                    placeholder=''
                                 
                                />
                            </FormControl>
                            <TextField
                                select
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BiCalendar />
                                    </InputAdornment>
                                }
                                label='status'
                                value={project.id_status_project}
                                variant='standard'
                                onChange={event => setProject({ ...project, id_status_project: event.target.value })}
                            >
                                {
                                    status_project.map((status, index) => (
                                        <MenuItem key={index} value={status.id}>
                                         {status.status} | {status.color} 
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                </div>
                </div>
                {
                    params.id && (
                        <div className='flex flex-col gap-6 text-yummy-800 items-end'>
                            <span className='flex gap-2 items-center cursor-pointer hover:text-yummy-600 transition-colors' onClick={() => delete_project()}>Remove Project <BiTrash /></span>
                        </div>
                    )
                }
            </div >
            {
                successAlert && (
                    <Alert severity='success' className='absolute bottom-2 left-2 transition-all duration-300 z-50'>Project Updated! ID: {project.id}</Alert>
                )
            }
        </>
    )
}

export default ProjectDetail