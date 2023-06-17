import EliminarMascota from "../../EliminarMascota";
import { useParams } from "react-router-dom";

function EliminarMascotaPage() {
  const { idMascota } = useParams();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Eliminar mascota</h1>
          </div>
        </div>

        <EliminarMascota idMascota={idMascota} />
      </div>
    </>
  );
}

export default EliminarMascotaPage;
