import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";




export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<HomePage />}/>
        </Routes>
    )
}