import { Outlet } from "react-router-dom";
import Navbar from "../Componet/Navbar";
import { BsFillMoonStarsFill } from "react-icons/bs";
import Footer from "../Componet/Footer";


const RootLayout = () => {
    return (
        <>
        <div className="app1">
            <Navbar icon={<BsFillMoonStarsFill />} />
<main  className="containt">
            
                <Outlet />
                
                </main>
            
            <Footer />
            </div>
            
        </>
    );
}
export default RootLayout;