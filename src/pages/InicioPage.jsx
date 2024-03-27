import { useDispatch, useSelector } from "react-redux";
import { seleccionQuincenaMes } from "../store/slices/generalesSlice";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const InicioPage = () => {
  const { meses, quincenas, quincena } = useSelector(
    (state) => state.generales
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [seleccion, setSeleccion] = useState("");

  const onHandleChange = (event) => {
    setSeleccion(event.target.value);
  };

  const siguiente = () => {
    navigate("/generales");
  };

  useEffect(() => {
    let mesLocalStorage = localStorage.getItem("mesG");

    if (mesLocalStorage != null) {
      return;
    } else {
      dispatch(seleccionQuincenaMes("1Enero"));
    }
  });

  useEffect(() => {
    setSeleccion(quincena);
  }, [quincena]);

  return (
    <>
      <h3>Selecciona la quincena:</h3>
      <select value={seleccion} onChange={onHandleChange}>
        {meses.map((mes, index) =>
          quincenas.map((quincenas, index2) => (
            <option key={`${index}-${index2}`} value={`${quincenas}${mes}`}>
              {quincenas}º {mes}
            </option>
          ))
        )}
      </select>
      <button
        type="button"
        onClick={() => {
          dispatch(seleccionQuincenaMes(seleccion));
          localStorage.setItem("mesG", seleccion);
          siguiente();
        }}
      >
        Seleccionar
      </button>
      {/* <div>Quincena: {quincena}</div> */}
    </>
  );
};
