
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

function CrearMascota(){
    // const [mascota, setMascota] = useState({})
    // const {idMascota} = useParams()

    // useEffect(()=>{
    //     fetch(`http://localhost:2023/api/mascotas/${idMascota}`)
    //     .then(response => response.json())
    //     .then(data =>{
    //         if(data){
    //             setMascota(data)
    //         }
    //     })

    // },[idMascota])
    
    return (
        <div>
            <form id="form-crear_encontrado">
         <div class="row">
          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="edad">Especie</label>
            <input type="text" class="form-control" name="edad_encontrado" id="edad_encontrado"
             placeholder="Perro, gato" />
           </div>
          </div>
          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" name="nombre_encontrado" id="nombre_encontrado"
             placeholder="Nombre" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="nombre">Color del pelaje</label>
            <input type="text" class="form-control" name="color_encontrado" id="color_encontrado" placeholder="Color" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="raza">Raza</label>
            <input type="text" class="form-control" name="raza_encontrado" id="raza_encontrado" placeholder="raza" />
           </div>
          </div>

          

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="app_hoggo_tamanoencontrado_idtamano">Tamaño</label>
            <select id="app_hoggo_tamanoencontrado_idtamano" class="form-control"
             name="app_hoggo_tamanoencontrado_idtamano"></select>
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="app_hoggo_sexoencontrado_idsexo">Sexo</label>
            <select id="app_hoggo_sexoencontrado_idsexo" class="form-control"
             name="app_hoggo_sexoencontrado_idsexo"></select>
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="app_hoggo_collar_idcollar">¿El animal tiene collar?</label>
            <select id="app_hoggo_collar_idcollar" class="form-control" name="app_hoggo_collar_idcollar"></select>
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="descripcion">¿Cómo es la mascota?¿Cómo lo encontraste?</label>
            <textarea class="form-control" name="descripcion_encontrado" id="descripcion_encontrado"
             rows="5"></textarea>
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="zona">Zona en la que apareció</label>
            <input type="text" class="form-control" name="zona_encontrado" id="zona_encontrado" placeholder="zona" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="fecha">Fecha en la que fue encontrado <span>*obligatorio</span></label>
            <input type="date" class="form-control" name="fecha_encontrado" id="fecha_encontrado" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="cel">Celular de contacto <span>*obligatorio</span></label>
            <input type="number" class="form-control" name="cel_encontrado" id="cel_encontrado"
             placeholder="Celular de contacto" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="wpp">WhatsApp de contacto</label>
            <input type="number" class="form-control" name="wpp_encontrado" id="wpp_encontrado"
             placeholder="WhatsApp de contacto" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="mail">Email de contacto</label>
            <input type="email" class="form-control" name="mail_encontrado" id="mail_encontrado"
             placeholder="Email de contacto" />
           </div>
          </div>

          <div class="col-xs-6 col-md-4">
           <div class="form-group">
            <label for="foto">Foto <span>*obligatorio</span></label>
            <input type="file" class="form-control-file" name="foto_encontrado" id="foto_encontrado" />
            <small class="form-text text-muted">La foto tiene que ser en formato png/jpg</small>
           </div>
          </div>
         </div>

         <input type="text" class="hidden" name="usuarios_idusuarios" id="encontrados_usuarios_idusuarios" />

         <button id="boton-crear_encontrado"
          class="btn btn-primary redbtn float-right my-2 text-white text-center my-5 col-md-2 boton-color">
          Crear
         </button>
        </form>
            
        </div>
    )
}

export default CrearMascota