import './App.css';
import SearchComponents from './components/SearchComponents';

function App() {
  return (
    <div className="container-fluid">
      <br></br>
      <h2 className="text-center">Listado y filtro de Alumnos por periodo y carrera con React y Node.js (nestJS), MySQL</h2>
      <SearchComponents />
    </div>
  );
}

export default App;
