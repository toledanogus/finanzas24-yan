import { Navigate, Route, Routes } from "react-router-dom";
import { InicioPage } from "../pages/InicioPage";
import { GeneralesPage } from "../pages/GeneralesPage";
import { SimuladorPage } from "../pages/SimuladorPage";


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="inicio" element={<InicioPage />}/>
        <Route path="generales" element={<GeneralesPage />}/>
        <Route path="simulador" element={<SimuladorPage />}/>
        <Route path="/" element={<Navigate to = "Inicio" />}/>
    </Routes>
  )
}
