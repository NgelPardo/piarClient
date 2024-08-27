import { Navigate, Route, Routes } from "react-router-dom"
import { FormPage, HomePage, PiarPage, UsersPage } from "../pages"

export const PiarRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={ <HomePage/> }/>

        <Route path="form" element={ <FormPage/> }/>
        <Route path="users" element={ <UsersPage/> }/>

        <Route path="piar/:idPiar?" element={ <PiarPage/> }/>

        <Route path="/*" element={ <Navigate to={"/"} /> } />
    </Routes>
  )
}
