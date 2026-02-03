import { Navigate } from "react-router-dom";
import RootLayout from "../Pages/RootLayout";

export default function  AuthGuard(){
    const logindata = JSON.parse(localStorage.getItem("logindata"));

    if (!logindata){
        return <Navigate to ="/SignUp" replace/>
    }
    return<RootLayout/>
}