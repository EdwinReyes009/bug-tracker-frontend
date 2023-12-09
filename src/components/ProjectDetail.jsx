import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Input } from '@mui/material'
import { InputAdornment } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { BiCalendar, BiUser, BiText, BiTrash } from 'react-icons/bi'
import { HiArrowCircleUp } from 'react-icons/hi'
import { status_project } from '../services/status_project'
import Rating from '@mui/material/Rating'
import { Alert } from '@mui/material'
import axios from 'axios'
import TopBar from './TopBar'
import { decodedDataJWT } from '../services/jwt'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AlertConfirm from './AlertConfirm'


function ProjectDetail() {
    const params = useParams()

    const initialDueDate = dayjs();  // Esto crea una nueva instancia con la fecha y hora actuales
    const navigate = useNavigate()
    const [successAlert, setSuccessAlert] = useState(false)
    const [successAlertUpd, setSuccessAlertUpd] = useState(false)
    let [project, setProject] = useState({
        id: 0,
        name: '',
        description: '',
        due_date: initialDueDate,
        end_date: initialDueDate,
        id_user: decodedDataJWT().id,
        id_dev: '',
        id_status_project: 1,
    })


    useEffect(() => {
        async function get_project() {
            const id = params.id
            const id_num = parseInt(id, 10);
            
                const data = await axios.get(`http://localhost:8000/get_project_by_id/${id_num}`);

                if (!data.error) {
                    
                    // console.log(data.data.msg)
                    const dataID = data.data.msg;

                    setProject({
                        id: dataID.id,
                        name: dataID.Proyecto,
                        description: '',
                        due_date: null,
                        end_date: null,
                        id_user: decodedDataJWT().id,
                        id_dev: decodedDataJWT().id,
                        id_status_project: 1,
                    });
                }
            
        }

         get_project()
        return () => { }
    }, [params])


    const imprimir = () => {
        console.log(project)
    }

    const put_update_project = async () => {
       
        const id = params.id
        const id_pro = parseInt(id, 10);

       
        const data = await axios.put(`http://localhost:8000/update_project/{id}?id_pro=${id_pro}`, project);

        if (!data.error) {
            setProject(data.data.msg)
            setSuccessAlertUpd(true)
            setTimeout(() => {
                navigate(`/home/proyectos`)
                setSuccessAlertUpd(false)
            }, 4000);
        }
    };

    const post_create_project = async () => {

        // Realizar la solicitud POST
        const data = await axios.post('http://localhost:8000/create_project', project);

        if (!data.error) {
            setSuccessAlert(true)
            setTimeout(() => {
                navigate(`/home/proyectos`)
                console.log('Se creo un nuevo proyecto')
            }, 4000)
        } else {
            setSuccessAlert(false)
            console.error('No se ha podido crear el proyecto')
        }
    }

    

    const valid_form = () => {
        if (project.name == '' || project.description == '' || project.id_dev == '' || project.id_status_project == 0)
            return true

        return false
    }



    const handleDateChange = (date) => {
        // Obtener la fecha formateada (YYYY-MM-DD)
        const formattedDateTime = date.toISOString();

        // Actualizar el estado con la fecha y hora formateadas
        setProject({ ...project, due_date: formattedDateTime });
    };

    const handleDateEndChange = (date) => {
        // Obtener la fecha formateada (YYYY-MM-DD)
        const formattedDateTime = date.toISOString();

        // Actualizar el estado con la fecha y hora formateadas
        setProject({ ...project, end_date: formattedDateTime });
    };




    return (
        <>
            <TopBar page={'Project Details'} className='w-full' />

            <div className='flex flex-col gap-6'>
                {
                    params.id ? (
                        <>
                        <div className='flex justify-between'>
                            <h1 className='px-32 pt-5  font-bold text-xl'>Edit Project</h1>
                            <button className='mt-4 ml-auto mr-3 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black' onClick={() => put_update_project()} disabled={valid_form()}>Update Project</button>
                            <button className=' mt-4 ml-1 mr-7 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black' onClick={() => navigate(`/home/proyectos`)} >Go Back </button>
                        </div>
                        <h2 className='px-32 pb-5 font-medium text-lg'> ID Project Detaild: <span className='text-lg font-bold font-montserrat'>{project.id}</span></h2>
                        </>
                        

                    ) : (
                        <div className='flex justify-between'>
                            <h1 className='px-32 pt-5 pb-5 font-bold text-xl'>Create New Project</h1>

                            {/* <button className='mt-4 ml-auto mr-3 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black'onClick={() => post_create_project()} disabled={valid_form()}>Crear Nuevo</button>    */}
                            <button className='mt-4 ml-auto mr-3 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black' onClick={() => post_create_project()} disabled={valid_form()}>Create New</button>
                            <button className=' mt-4 ml-1 mr-7 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black' onClick={() => navigate(`/home/proyectos`)} >Go Back </button>

                        </div>
                    )
                }
                <div className='px-32'>
                    
                    <div className='flex flex-col gap-8'>

                        <div className='grid grid-cols-2 gap-6'>

                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Name
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startadornment={
                                        <InputAdornment position="start">
                                            <BiText />
                                        </InputAdornment>
                                    }
                                    value={project.name}
                                    onChange={event => setProject({ ...project, name: event.target.value })}
                                    placeholder={"Write the name of project here"}
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
                                    ? "Description is required"
                                    : ""
                            }
                            error={!(project.description)}
                        />

                        <div className='grid grid-cols-4 gap-20 mt-8'>
                            <FormControl variant="standard">

                                <LocalizationProvider dateAdapter={AdapterDayjs}>


                                    <DatePicker
                                        label="Due Date:"
                                        value={project.due_date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <input {...params} />}
                                    />

                                </LocalizationProvider>
                            </FormControl>

                            <FormControl variant="standard">
                               
                                <LocalizationProvider dateAdapter={AdapterDayjs}>            
                                        <DatePicker
                                            label="Fecha de Completado:"
                                            value={project.end_date}
                                            onChange={handleDateEndChange}
                                        />
                                </LocalizationProvider>
                            </FormControl>


                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    id_dev:
                                </InputLabel>
                                <Input

                                    id="input-with-icon-adornment"
                                    startadornment={
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
                                startadornment={
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
                    <AlertConfirm
                        textBig={'Success!'}
                        textLittle={'You have created a new project successfully!'}
                        colorFondo={'bg-green-300'}
                        colorBorde={'green-500'}
                        colorTexto={'green-700'}
                        icono={true}
                    />
                )
            }

            {
                successAlertUpd && (
                    <AlertConfirm
                        textBig={'Updated!'}
                        textLittle={'You have updated the project successfully!'}
                        colorFondo={'bg-blue-300'}
                        colorBorde={'blue-500'}
                        colorTexto={'blue-700'}
                        icono={true}
                    />
                )
            }

            
        </>
    )
}

export default ProjectDetail