import React, {useState, useEffect} from 'react'
//import axios from 'axios'

const SearchComponents = () => {
    //setear los hooks useState
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [pro, setPro] = useState("")
    const [peri,setPeri] = useState("")
    const [periodos, setPeriodos] = useState([])
    const [programas, setProgramas] = useState([])
    //funcion para traer los datos de la API para
    const URL = 'http://localhost:3000/students/1/202202'
    const URL1 = 'http://localhost:3000/students/periodos'
    const URL2 = 'http://localhost:3000/students/programas'

    // useEffect(()=>{
    //     axios
    //     .get(`http://localhost:3000/students/${pro}/${peri}`)
    //     .then(response => {
    //     //console.log(response)
    //     setUsers(response)
    //     })
    // })

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        //console.log(data)
        setUsers(data)
    }

    const showProgramas = async () => {
        const response = await fetch(URL2)
        const data = await response.json()
        //console.log(data)
        setProgramas(data)
    }

    const showPeriodos = async () => {
        const response = await fetch(URL1)
        const data = await response.json()
        //console.log(data)
        setPeriodos(data)
    }

    //funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        //console.log(e.target.value)
    }

    const progra = (e) => {
        setPro(e.target.value)
        //console.log(e.target.value)
    }

    const per = (e) => {
        setPeri(e.target.value)
        //console.log(e.target.value)
    }

    //metodo de filtrado
    //Metodo 1
    let results = []
    if (!search) {
        results = users
    }else {
        results = users.filter( (dato) => 
        dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
    //Metodo 2
    //const results = !search ? users : users.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(()=>{
        showData()
        showProgramas()
        showPeriodos()
    }, [])
    
    //renderizamos la vista
  return (
    <div>
        <div className="row">
            <div className="col-3">
                <select class="form-select" value={pro} onChange={progra}>
                    <option selected>Seleccione una Carrera/Programa</option>
                    { programas.map( (programa) => (
                        <option key={programa.av_pro_id} value={programa.av_pro_id}>{programa.av_pro_nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col-3">
                <select class="form-select" value={peri} onChange={per}>
                    <option selected>Seleccione un Periodo</option>
                    { periodos.map( (periodo) => (
                        <option key={periodo.av_cic_id} value={periodo.av_cic_id}>{periodo.av_periodo}</option>
                    ))}
                </select>
            </div>
            <div className="col-6">
                <input value={search} onChange={searcher} type="text" placeholder="Search" className='form-control'/>
            </div>
        </div>
        
        <table className="table table-striped table-hover mt-5 shadow-lg">
            <thead>
                <tr className="bg-curso text-white">
                    <th>Numero Documento</th>
                    <th>Name</th>
                    <th>Apellidos</th>
                    <th>Carrera</th>
                    <th>Periodo</th>
                </tr>
            </thead>
            <tbody>
                { results.map( (user) => (
                    <tr key={user.av_per_doc_num}>
                        <td>{user.av_per_doc_num}</td>
                        <td>{user.nombres}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.av_pro_nombre}</td>
                        <td>{user.av_periodo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default SearchComponents