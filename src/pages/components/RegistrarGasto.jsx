/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setRedibujar } from "../../store/slices/generalesSlice";

export const RegistrarGasto = () => {
  const dispatch = useDispatch();
  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [url, setUrl] = useState("./php/test.php");
  const [jsonito, setJsonito] = useState("");
  const { data, hasError, isLoading } = useFetch(url, jsonito);
  const { quincena, conceptos, pagados, redibujar } = useSelector(
    (state) => state.generales
  );

  let datosJson = new Object();
  datosJson["newConcept"] = concepto;
  datosJson["newValue"] = cantidad;
  datosJson["quincena"] = quincena;

  const registrarNuevo = () => {
    setJsonito(datosJson);
    dispatch(setRedibujar({ redibujar: Number(redibujar) + 1 }));
    setUrl("./php/nuevoGasto.php");
    setConcepto("");
    setCantidad("");
    alert("Registro exitoso");
  };

  const getConcepto = (event) => {
    setConcepto(event.target.value);
  };

  const getCantidad = ({ target }) => {
    setCantidad(target.value);
  };

  /* useEffect(() => {
  
}, [url, datosJson]); */

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Ingresar nuevo gasto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Concepto:</td>
            <td>
              <input type="text" value={concepto} onChange={getConcepto} />
            </td>
          </tr>
          <tr>
            <td>Cantidad:</td>
            <td>
              <input type="number" value={cantidad} onChange={getCantidad} />
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={
                  concepto != "" && cantidad != "" ? registrarNuevo : null
                }
              >
                Registrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div>{JSON.stringify(datosJson)}</div> */}
      {/* {<div>{console.log(redibujar)}</div>} */}
    </>
  );
};
