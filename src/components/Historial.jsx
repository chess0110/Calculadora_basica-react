import './HistStyle.css'



function Historial({operaciones}){


  return(
    <>
      <div className="mainHistorial">
        <ul>
          {operaciones.map((operacion,index)=>(
            <li key={index}>
              <p>{operacion}</p>
            </li>
           ))}
        </ul>
      </div>
    </>
  )
}

export default Historial