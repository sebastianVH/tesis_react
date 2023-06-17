import EditarMascota from "../../EditarMascota";
import { useParams } from "react-router-dom";

function EditarMascotaPage() {
  const { idMascota } = useParams();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Editar Mascota</h1>
          </div>
        </div>

        <EditarMascota idMascota={idMascota} />
      </div>
    </>
  );
}

export default EditarMascotaPage;
