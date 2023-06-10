import MascotaListItem from "./MascotaListItem"
import './MascotaList.css'
import { useEffect, useState } from "react"

function MascotasList(){
    const [mascotas, setMascotas] = useState([])
    const [mascotasAll, setMascotasAll] = useState([])
    const [filtroCategoria, setFiltroCategoria] = useState('Encontrado')

    const cambiarFiltroCategoria = (categoria) => {
      fetch(`http://localhost:2023/api/mascotas?categoria=${categoria}`)
      .then(response => response.json())
      .then(data =>{
          setMascotasAll(data)
          setMascotas(data)
      })
    }

    const onChangeFilter = (event) => {
        setMascotas(mascotasAll.filter((e)=> e.nombre.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    // ejercutar la funcion cuando se monta el componente
    useEffect(()=>{
        fetch(`http://localhost:2023/api/mascotas?categoria=${filtroCategoria}`)
        .then(response => response.json())
        .then(data =>{
            setMascotasAll(data)
            setMascotas(data)
        })

    }, [])

    useEffect(()=>{

    }, [mascotas])

    return (
        <div className='mascota-list my-4'>
         <div className="container text-center col-12 titulo-seccion mx-auto pb-0">
          <h2 className="titulo-listado">Listado de mascotas</h2>
          </div>
          <div className="container text-center container-filtros">
          <button onClick={() =>cambiarFiltroCategoria('Perdido')} className="btn btn-naranja mx-2">Perdidas</button>
          <button onClick={() =>cambiarFiltroCategoria('Encontrado')} className="btn btn-azul mx-2">Encontradas</button>
          </div>
            <form className='mascota-list__form'>
                Buscar: <input id="filtro" className='mascota-list__filter' type='text' onChange={onChangeFilter} placeholder="Escribí el nombre de la mascota" />
            </form>
            <div className="container listado-perros">
     <div class="perrosencontrados row mascota-list__list">
      {/* <!-- Acá se imprimen las cards de mascotas --> */}
      {mascotas.map(mascota => <MascotaListItem key={mascota._id} mascota={mascota}  />)}
     </div>
    </div>
            
        </div>
    )
}


export default MascotasList