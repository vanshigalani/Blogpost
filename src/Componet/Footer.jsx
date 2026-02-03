import { useContext } from "react";
import "./Footer.css";
import { ModeContext } from '../Cotext/ModeContext';

export default function Footer ()  {
    const ctx = useContext(ModeContext);
return(
    <>
    <div className= {`footer ${ctx.mode }`}>
        <p>@{new Date().getFullYear()} All Rights Are reserved <b>BlogPost</b></p>
    </div>
    </>
)
}