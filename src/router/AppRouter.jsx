import { Navigate, Route, Routes } from "react-router-dom";
import { InicioPage } from "../pages/InicioPage";
import { GeneralesPage } from "../pages/GeneralesPage";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="inicio" element={<InicioPage />}/>
        <Route path="generales" element={<GeneralesPage />}/>
        <Route path="/" element={<Navigate to = "Inicio" />}/>
    </Routes>
  )
}
