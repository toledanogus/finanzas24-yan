
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConceptos,
  sendPagados,
} from "../store/slices/thunks";
import {
  seleccionQuincenaMes,
  setPagados,
  setTotalTemporal2,
} from "../store/slices/generalesSlice";
import { useFetch } from "../hooks/useFetch";
import { RegistrarGasto } from "./components/RegistrarGasto";
import { useNavigate } from "react-router-dom";


export const SimuladorPage = () => {
    const { quincena, conceptos, pagados, redibujar, totalTemporal2, meses, quincenas } =
    useSelector((state) => state.generales);
  const dispatch = useDispatch();
  //const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [datosCargados, setDatosCargados] = useState(false);
  const [mesLocalStorage, setMesLocalStorage] = useState("1Enero");
  const navigate = useNavigate();
  const [quincenaOk, setQuincenaOk] = useState("");
  const [render, setRender] = useState(0);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [resultado, setResultado] = useState(0);
  const [aSumar, setASumar] = useState([]);
  const [checkedItems2, setCheckedItems2] = useState(new Set());
  const [resultado2, setResultado2] = useState(0);
  const [aSumar2, setASumar2] = useState([]);

  /* FUNCIONES**************************************************************** */

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target;
  
    if (checked) {
      setCheckedItems((prevCheckedItems) => new Set(prevCheckedItems.add(name)));
      setASumar((prevASumar) => [...prevASumar, Number(value)]);
    } else {
      setCheckedItems((prevCheckedItems) => {
        const newCheckedItems = new Set(prevCheckedItems);
        newCheckedItems.delete(name);
        return newCheckedItems;
      });
  
      setASumar((prevASumar) => {
        const index = prevASumar.findIndex((item) => item === Number(value));
        if (index !== -1) {
          const newArray = [...prevASumar];
          newArray.splice(index, 1); // Elimina solo la primera instancia encontrada
          return newArray;
        }
        return prevASumar;
      });
    }
  };
  
  const handleCheckboxChange2 = (event) => {
    const { name, checked, value } = event.target;
  
    if (checked) {
      setCheckedItems2((prevCheckedItems) => new Set(prevCheckedItems.add(name)));
      setASumar2((prevASumar) => [...prevASumar, Number(value)]);
    } else {
      setCheckedItems2((prevCheckedItems) => {
        const newCheckedItems = new Set(prevCheckedItems);
        newCheckedItems.delete(name);
        return newCheckedItems;
      });
  
      setASumar2((prevASumar) => {
        const index = prevASumar.findIndex((item) => item === Number(value));
        if (index !== -1) {
          const newArray = [...prevASumar];
          newArray.splice(index, 1); // Elimina solo la primera instancia encontrada
          return newArray;
        }
        return prevASumar;
      });
    }
  };


  
  const sumarMarcados = () => {
    const resultadoTemp = aSumar.reduce((acumulador, valor)=>{
        return acumulador + valor;
    }, 0);
    setResultado(resultadoTemp);
  }
  
  const sumarMarcados2 = () => {
    const resultadoTemp = aSumar2.reduce((acumulador, valor)=>{
        return acumulador + valor;
    }, 0);
    setResultado2(resultadoTemp);
  }

  const sumarTotal2 = () => {
    
    const suma = conceptos.reduce((total, [, cantidad, pagado]) => {
      if (pagado === 0) {
        return total + cantidad;
      }
      return total;
    }, 0);
    setTotal2(suma);
  };

  
  const aGenerales = () => {
    navigate("/generales");
  };

  const mesSiguiente = () => {
    const mesActual = localStorage.getItem("mesG");
    const completos = meses.flatMap((mes) =>
      quincenas.map((quincena) => `${quincena}${mes}`)
    );
    completos.forEach((item, indice) => {
      if (mesActual === item && completos[indice+1]) {
        localStorage.setItem("mesG", completos[indice+1]);
        window.location.reload();
      }
    });
};

  const mesAnterior = () => {
    const mesActual = localStorage.getItem("mesG");
    const completos = meses.flatMap((mes) =>
      quincenas.map((quincena) => `${quincena}${mes}`)
    );
    completos.forEach((item, indice) => {
      if (mesActual === item && completos[indice-1]) {
        localStorage.setItem("mesG", completos[indice-1]);
        window.location.reload();
      }
    });
  };

  const resetear = () => {
    setCheckedItems(new Set());
    setResultado(0);
    setASumar([]);
    setCheckedItems2(new Set());
    setResultado2(0);
    setASumar2([]);
  }

  /* EFECTOS *******************************************************/
  useEffect(() => {
    const qMes = localStorage.getItem("mesG");
    dispatch(seleccionQuincenaMes(qMes));
  }, []);

  useEffect(() => {
    if (conceptos !== 1) {
      sumarTotal2();
    }
  }, [conceptos]);

  useEffect(() => {
    setMesLocalStorage(quincena);
  }, []);

  useEffect(() => {
    dispatch(getConceptos());
    setRender(render+1);
  }, [redibujar]);

  useEffect(() => {
    setQuincenaOk(quincena);
  }, []);

  useEffect(() => {
    if (aSumar) {
        sumarMarcados();
    }
  }, [checkedItems]);

  useEffect(() => {
    if (aSumar2) {
        sumarMarcados2();
    }
  }, [checkedItems2]);
  

  return (
    <>
      <div className="adelanteAtras">
        <button className="aa" onClick={mesAnterior}>
          &lt;
        </button>
        <h3 className="tituloPrincipal">{`Quincena: ${quincena.replace(
          /(\d+)([a-zA-Z]+)/,
          "$1º $2"
        )}`}</h3>
        <button className="aa" onClick={mesSiguiente}>
          &gt;
        </button>
      </div>
      <table className="simulador">
        <thead>
          <tr>
            <th colSpan="4" id="titulo" className="titulotabla">
              Gastos permanentes
            </th>
          </tr>
          <tr>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>Efectivo</th>
            <th>Elec.</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(conceptos).map(([index, concepto]) => (
            <tr key={index}>
              <td><div className="texto-cortado">{concepto[0]}</div></td>
              <td>
                {concepto[1] && concepto[1]
                  ? `$${concepto[1].toLocaleString()}`
                  : "—"}
              </td>
              <td>
                { (
                  <input
                    name={concepto[0]}
                    value={concepto[1]} // Cambiado a concepto[1]
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={checkedItems.has(concepto[0])} // Nuevo
                  />
                ) }
              </td>
              <td>
                { (
                  <input
                    name={concepto[0]}
                    value={concepto[1]} // Cambiado a concepto[1]
                    type="checkbox"
                    onChange={handleCheckboxChange2}
                    checked={checkedItems2.has(concepto[0])} // Nuevo
                  />
                ) }
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
      <table>
        <tr>
            <td>Efectivo:</td>
            <td><span className="negritas">{`$${resultado.toLocaleString()}`}</span></td>
        </tr>
        <tr>
            <td>Electrónico:</td>
            <td><span className="negritas">{`$${resultado2.toLocaleString()}`}</span></td>
        </tr>
      </table>
      <button className="resetear" onClick={resetear}>Resetear</button>
      <div>
      <button className="navegacion" onClick={aGenerales}>
        Gastos
      </button>
      </div>
    </>
  );
}
