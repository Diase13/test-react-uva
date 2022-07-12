import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchComponents = () => {
    //setear los hooks useState
    const [users, setUsers] = useState([])
    //const [search, setSearch] = useState("")
    const [pro, setPro] = useState("")
    const [peri,setPeri] = useState("")
    const [periodos, setPeriodos] = useState([])
    const [programas, setProgramas] = useState([])
    //funcion para traer los datos de la API para
    //const URL = 'http://localhost:3020/students/1/202202'
    //const URL1 = 'http://localhost:3020/students/periodos'
    //const URL2 = 'http://localhost:3020/students/programas'

    // const showData = async () => {
    //     const response = await fetch(URL)
    //     const data = await response.json()
    //     //console.log(data)
    //     setUsers(data)
    // }

    const baseUrl = 'http://localhost:3020'

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzc191c3VfaWQiOjEsInNzX3JvbF9ub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXZfcGVyX25vbWJyZSI6IkVsaW8gQ2FiYW5pbGxhcyIsImlhdCI6MTY1NzY0NTQ5NSwiZXhwIjoxNjU3NzE3NDk1fQ.K8muag9HL4Bzd5BrTZS8mPlsbgCYKpNccz-I8ciRmFY'
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const showProgramas = async () => {
        axios
            .get(`${baseUrl}/students/programas`, config)
            .then(response => {
                //console.log(response)
                setProgramas(response.data)
            })
        // const response = await fetch(URL2)
        // const data = await response.json()
        // //console.log(data)
        // setProgramas(data)
    }

    const showPeriodos = async () => {
        axios
            .get(`${baseUrl}/students/periodos` , config)
            .then(response => {
                //console.log(response)
                setPeriodos(response.data)
            })
        // const response = await fetch(URL1)
        // const data = await response.json()
        // //console.log(data)
        // setPeriodos(data)
    }

    //funcion de busqueda
    // const searcher = (e) => {
    //     setSearch(e.target.value)
    //     //console.log(e.target.value)
    // }

    const progra = (e) => {
        setPro(e.target.value)
        //console.log(e.target.value)
    }

    const per = (e) => {
        setPeri(e.target.value)
        //console.log(e.target.value)
    }

    const handleSubmit =( e ) => {
        e.preventDefault();
        axios
            .get(`${baseUrl}/students/${pro}/${peri}` , config)
            .then(response => {
                //console.log(response)
                setUsers(response.data)
            })
       
    }

    const columns = [
        { field: 'av_per_doc_num', 
        headerName: 'Nro Documento', 
        cellClassName: 'super-app-theme--cell', 
        width: 200 
        },
        { field: 'nombres', headerName: 'Nombre', width: 150 },
        { field: 'apellidos', headerName: 'Apellidos', width: 150 },
        { field: 'av_pro_nombre', headerName: 'Carrera', width: 380 },
        { field: 'av_periodo', headerName: 'Periodo', width: 130 },
    ];

    //metodo de filtrado
    //Metodo 1
    // let results = []
    // if (!search) {
    //     results = users
    // }else {
    //     results = users.filter( (dato) => 
    //     dato.nombres.toLowerCase().includes(search.toLocaleLowerCase()) || 
    //     dato.apellidos.toLowerCase().includes(search.toLocaleLowerCase())
    //     )
    // }
    //Metodo 2
    //const results = !search ? users : users.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(()=>{
        // showData()
        showProgramas()
        showPeriodos()
    }, [])
    
    //renderizamos la vista
  return (
    <div>
        <div className="card">
           
            <div className="card-body">
                <h5 className="card-title text-center p0">LISTADO DE ALUMNOS POR CARRERA Y PERIODO  </h5>
                <hr></hr>
                <br></br>
                <form className="row g-3 needs-validation mt-3" onSubmit={handleSubmit}>
                    <div className="col-md-3">
                        <Autocomplete
                        disablePortal
                        getOptionLabel={(programa) => programa.av_pro_nombre}
                        onChange={progra}
                        id="combo-box-demo"
                        options={programas}
                        sx={{ width: 300 }}
                        renderOption={(props, programa) => (
                            <Box component="li" {...props} key={programa.av_pro_id} value={programa.av_pro_id}>
                            {programa.av_pro_nombre}
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label="Carrera" />}
                        />
                    </div>
                    <div className="col-md-3">
                        <Autocomplete
                        disablePortal
                        getOptionLabel={(periodo) => periodo.av_periodo}
                        onChange={per}
                        id="combo-box-demo"
                        options={periodos}
                        sx={{ width: 300 }}
                        renderOption={(props, periodo) => (
                            <Box component="li" {...props} key={periodo.av_cic_id} value={periodo.av_periodo}>
                            {periodo.av_periodo}
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label="Carrera" />}
                        />
                    </div>
                    {/* <div className="col-md-3">
                        <label  className="form-label" >Nombre</label>
                        <input value={search} onChange={searcher} type="text" placeholder="Buscar" className='form-control'/>
                    </div> */}
                    <div className="col-md-3">
                        <button type='submit' className='btn btn-light mt-4'>Buscar</button>            
                    </div>
                    
                </form>
                <br></br>
                <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    rows={users}
                    getRowId={(row) => row.av_per_doc_num}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                />
                </Box>
                {/* <table className="table table-striped table-hover mt-4 shadow-lg">
                    <thead>
                        <tr className="bg-dark text-white">
                            <th>#</th>
                            <th>Nro. Documento</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Carrera</th>
                            <th>Periodo</th>
                        </tr>
                    </thead>
                    <tbody>
                        { results.map( (user,index) => (
                            <tr key={user.av_per_doc_num}>
                                <td>{index+1}</td>
                                <td>{user.av_per_doc_num}</td>
                                <td>{user.nombres}</td>
                                <td>{user.apellidos}</td>
                                <td>{user.av_pro_nombre}</td>
                                <td>{user.av_periodo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            </div>
        </div>
    </div>
  )
}
export default SearchComponents