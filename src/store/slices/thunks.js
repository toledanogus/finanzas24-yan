import {
  selectPagados,
  selectQuincena,
  setConceptos,
  setTotalTemporal2,
} from "./generalesSlice";

import { banamexApi } from "../../api/banamexApi";
import { registroBanamexApi } from "../../api/registroBanamexApi";

export const getConceptos = () => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch, getState) => {
    const quincena = selectQuincena(getState());
    const jsonQuincena = { quincena };

    const resp = await fetch("./php/recibirConceptos.php", {
      method: "POST",
      body: JSON.stringify(jsonQuincena),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();

    dispatch(setConceptos({ conceptos: data }));
  };
};

export const sendPagados = () => {
  return async (dispatch, getState) => {
    const pagados = selectPagados(getState());
    const quincena = selectQuincena(getState());
    const unidos = {
      objetoPagados: { pagados },
      objetoQuincena: { quincena },
    };
    /* const jsonPagados = { pagados };
    console.log(jsonPagados); */

    // eslint-disable-next-line no-unused-vars
    const resp = await fetch("./php/enviarPagados.php", {
      method: "POST",
      body: JSON.stringify(unidos),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};