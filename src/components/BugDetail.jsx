import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Input } from '@mui/material'
import { InputAdornment } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { BiCalendar, BiUser, BiText, BiTrash } from 'react-icons/bi'
import { status_project } from '../services/status_project'
import axios from 'axios'
import TopBar from './TopBar'
import { decodedDataJWT } from '../services/jwt'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AlertConfirm from './AlertConfirm'
import { bugsService } from '../services/bugsService'

function BugDetail() {
    const params = useParams()

    const initialDueDate = dayjs();  // Esto crea una nueva instancia con la fecha y hora actuales
    const navigate = useNavigate()
    const [successAlert, setSuccessAlert] = useState(false)
    const [successAlertUpd, setSuccessAlertUpd] = useState(false)
    const [statusItems, setStatusItems] = useState([])
    const [categoriesItems, setCategoriesItems] = useState([])
    let [ticket, setTicket] = useState({
        id: '',
        title: '',
        description: '',
        id_status: 1,
        id_category: 1,
        id_severity: 0,
        due_date: initialDueDate,
        end_date: initialDueDate,
        id_user: decodedDataJWT().id,
        id_dev: '',
        id_platform: 0,
        id_project: 0,
    })


    useEffect(() => {

        const fetchData = async () => {
            try {
              const result = await bugsService();

              console.log(result)

              const statusItems = result.filter(item => item.tipo === 'status');
              console.log(statusItems);
              setStatusItems(statusItems)

              const categoriesItems = result.filter(item => item.tipo === 'categories'); 
              console.log(categoriesItems);
              setCategoriesItems(categoriesItems)

            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
        
          fetchData();
        

        async function get_project() {
            const id = params.id

            // console.log(id)
                const data = await axios.get(`http://localhost:8000/get_ticket_by_id/${id}`);


                if (!data.error) {
                    
                    // console.log(data.data.msg)
                    const dataID = data.data.msg;

                    setTicket({
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

    const post_create_ticket = async () => {

        // Realizar la solicitud POST
        const data = await axios.post('http://localhost:8000/create_ticket', project);

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
        if (ticket.title == '' || ticket.description == '' || ticket.id_status == 0 || ticket.id_category == 0 || ticket.id_severity == 0 || ticket.id_user == '' || ticket.id_platform || ticket.id_project == 0 )
            return true

        return false
    }



    const handleDateChange = (date) => {
        // Obtener la fecha formateada (YYYY-MM-DD)
        const formattedDateTime = date.toISOString();

        // Actualizar el estado con la fecha y hora formateadas
        setTicket({ ...ticket, due_date: formattedDateTime });
    };

    const handleDateEndChange = (date) => {
        // Obtener la fecha formateada (YYYY-MM-DD)
        const formattedDateTime = date.toISOString();

        // Actualizar el estado con la fecha y hora formateadas
        setTicket({ ...ticket, end_date: formattedDateTime });
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
                            <h1 className='px-32 pt-5 font-bold text-xl'>Register New Bug </h1>

                            {/* <button className='mt-4 ml-auto mr-3 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black'onClick={() => post_create_ticket()} disabled={valid_form()}>Crear Nuevo</button>    */}
                            <button className='mt-4 ml-auto mr-3 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black' onClick={() => post_create_ticket()} disabled={valid_form()}>Create New</button>
                            <button className=' mt-4 ml-1 mr-7 pl-3 pr-3 h-10 rounded-xl bg-yummy-800 hover:bg-yummy-400  text-white text-base font-bold disabled:bg-black' onClick={() => navigate(`/home/proyectos`)} >Go Back </button>

                        </div>
                    )
                }
                <div className='px-32 pb-10'>
                    
                    <div className='flex flex-col gap-8'>

                        <div className='grid grid-cols-2 gap-6'>

                            <FormControl variant="standard">
                                <InputLabel htmlFor="input-with-icon-adornment">
                                    Title
                                </InputLabel>
                                <Input
                                    id="input-with-icon-adornment"
                                    startadornment={
                                        <InputAdornment position="start">
                                            <BiText />
                                        </InputAdornment>
                                    }
                                    value={ticket.title}
                                    onChange={event => setTicket({ ...ticket, title: event.target.value })}
                                    placeholder={"Write the title of bug here"}
                                    error={!(ticket.title)}
                                />
                            </FormControl>

                        </div>

                        <TextField
                            variant="standard"
                            value={ticket.description}
                            rows={3}
                            multiline
                            label='Description'
                            onChange={event => setTicket({ ...ticket, description: event.target.value })}
                            placeholder='Write Description Here...'
                            helperText={
                                !(ticket.description)
                                    ? "Description is required"
                                    : ""
                            }
                            error={!(ticket.description)}
                        />

                        <div className='grid grid-cols-4 gap-20'>
                            <TextField
                                select
                                id="input-with-icon-adornment"
                                startadornment={
                                    <InputAdornment position="start">
                                        <BiCalendar />
                                    </InputAdornment>
                                }
                                label="status"
                                value={ticket.id_status}
                                variant="standard"
                                onChange={event => setTicket({ ...ticket, id_status: event.target.value })}
                            >
                                {statusItems.map((status, index) => (
                                    <MenuItem key={index} value={status.id}>
                                        {status.status}
                                    </MenuItem>
                                ))}
                            </TextField>

                        <TextField
                                select
                                id="input-with-icon-adornment"
                                startadornment={
                                    <InputAdornment position="start">
                                        <BiCalendar />
                                    </InputAdornment>
                                }
                                label='category'
                                value={ticket.id_category}
                                variant='standard'
                                onChange={event => setTicket({ ...ticket, id_category: event.target.value })}
                            >
                                {categoriesItems.map((categories, index) => (
                                    <MenuItem key={index} value={categories.id}>
                                        {status.category}
                                    </MenuItem>
                                ))}
                                
                            </TextField>
                        <TextField
                                select
                                id="input-with-icon-adornment"
                                startadornment={
                                    <InputAdornment position="start">
                                        <BiCalendar />
                                    </InputAdornment>
                                }
                                label='severity'
                                value={1}
                                variant='standard'
                                onChange={event => setTicket({ ...ticket, id_severity: event.target.value })}
                            >
                                {
                                    status_project.map((status, index) => (
                                        <MenuItem key={index} value={status.id}>
                                            {status.status} | {status.color}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        

                            <FormControl variant="standard">

                                <LocalizationProvider dateAdapter={AdapterDayjs}>


                                    <DatePicker
                                        label="Due Date:"
                                        value={ticket.due_date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <input {...params} />}
                                    />

                                </LocalizationProvider>
                            </FormControl>

                            <FormControl variant="standard">
                               
                                <LocalizationProvider dateAdapter={AdapterDayjs}>            
                                        <DatePicker
                                            label="Fecha de Completado:"
                                            value={ticket.end_date}
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
                                    value={''}
                                    onChange={event => setTicket({ ...ticket, id_dev: event.target.value })}
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
                                label='platform'
                                value={1}
                                variant='standard'
                                onChange={event => setTicket({ ...ticket, id_platform: event.target.value })}
                            >
                                {/* {
                                    status_project.map((status, index) => (
                                        <MenuItem key={index} value={status.id}>
                                            {status.status} | {status.color}
                                        </MenuItem>
                                    ))
                                } */}
                            </TextField>
                            <TextField
                                select
                                id="input-with-icon-adornment"
                                startadornment={
                                    <InputAdornment position="start">
                                        <BiCalendar />
                                    </InputAdornment>
                                }
                                label='project'
                                value={'jsjs'}
                                variant='standard'
                                onChange={event => setTicket({ ...ticket, id_project: event.target.value })}
                            >
                                {/* {
                                    status_project.map((status, index) => (
                                        <MenuItem key={index} value={status.id}>
                                            {status.status} | {status.color}
                                        </MenuItem>
                                    ))
                                } */}
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

export default BugDetail