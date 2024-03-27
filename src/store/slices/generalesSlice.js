import { createSelector, createSlice } from "@reduxjs/toolkit";

const selectGenerales = (state) => state.generales;

export const selectPagados = createSelector(
  [selectGenerales],
  (generales) => generales.pagados
);
export const selectQuincena = createSelector(
  [selectGenerales],
  (generales) => generales.quincena
);
// Obtén el valor de local storage
const mesLocalStorage = localStorage.getItem("mesG");
if (mesLocalStorage === null) {
  const valorPredeterminado = "1Enero";
  localStorage.setItem("mesG", valorPredeterminado);
}

export const generalesSlice = createSlice({
  name: "generales",
  initialState: {
    meses: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    quincena: "1Enero",
    conceptos: [""],
    quincenas: [1, 2],
    pagados: ["nada"],
    redibujar: 0,
    totalTemporal2: "",
  },
  reducers: {
    seleccionQuincenaMes: (state, action) => {
      state.quincena = action.payload;
    },
    setConceptos: (state, action) => {
      state.conceptos = action.payload.conceptos;
    },
    setPagados: (state, action) => {
      state.pagados = action.payload.pagados;
    },
    setRedibujar: (state, action) => {
      state.redibujar = action.payload.redibujar;
    },
    setTotalTemporal2: (state, action) => {
      state.totalTemporal2 = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  seleccionQuincenaMes,
  setConceptos,
  setPagados,
  setRedibujar,
  setTotalTemporal2,
} = generalesSlice.actions;
