import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './MascotaListItem.css'

function MascotaListItem({mascota}){

    // return <li className="mascota-list-item">
    //         <img className='mascota-image' src={mascota.imagen} />
    //         <div className='mascota-details'>
    //             <h3 className='mascota-name'>{mascota.nombre} <span className="mascota-code">Codigo: {mascota._id}</span></h3>
    //             <span className='mascota-price'>Categoria: {mascota.categoria}</span>
    //             <div className='mascota-actions'>
    //                 <Link to={`/mascotas/${mascota._id}`} className='mascota-view'>Ver mascota</Link>
    //             </div>
    //         </div>
    //     </li>

    return <div className='col-lg-3 col-6 d-flex align-items-stretch px-2 px-md-3 mb-4 '>
    
    <Link to={`/mascotas/${mascota._id}`} className='mascota-view'>
        <div className='card-perro'>
                <img src={mascota.imagen} className='img-fluid rounded-img' />
                <div className='card-perro-content pb-3 pt-2'>
                        <h4>{mascota.nombre}</h4><span>{mascota.raza}</span>
    <div className='div-ubicacion d-flex justify-content-around align-items-center'>
            <p><i className="icofont-location-pin icofont-2x ml-auto"></i>
            {mascota.zona_perdida}
            </p>
    </div>
            </div>
        </div>
    </Link>
</div>
}

MascotaListItem.propTypes = {
    mascota: PropTypes.object.isRequired
}

export default MascotaListItem