import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from 'react';
import ConfirmationModel from './ConfirmationModel';
import EditPostModel from './EditPostModel';
import { ModeContext } from '../Cotext/ModeContext';

export function Navbar(props) {

  const loggedInuser = JSON.parse(localStorage.getItem("logindata")) || {};
  const navigate = useNavigate();

  const ctx = useContext(ModeContext);
  console.log(ctx,"Context");
  

  console.log(loggedInuser);
  const [showModel,setshowModel] =useState(false);
  const [EditModel,setEditModel] =useState(false);
  const userIntial = loggedInuser?.role?.charAt(0).toUpperCase();

const showModelHandler =() => {
  setshowModel(true);
};


const hideModelHadler =() => {
  console.log("model close")
  setshowModel(false);
};


  const handleLogout = () => {
    localStorage.removeItem("logindata");
    toast.success("Logout Successful 👋", );
    setshowModel(false)
    setTimeout(() => {
      navigate("/SignUp");
    }, 2000);
  };

  return (
    <>
      
      <ToastContainer />

      <nav className={`nav ${ctx.mode == "dark" ? "nav-dark" : "nav-light"}`}>
        <h1 className='h1b'>Blogpost</h1>

        <div>
          <ul className='ul nav-links'>
            <li><NavLink  to="/" className={({isActive}) =>(isActive ?"link":"link")}>Home</NavLink></li>
            {loggedInuser?.role === "Admin" ? <li>
            <NavLink  to="/Post" className={({isActive}) =>(isActive ?"link":"link")}>New Post</NavLink>
             </li>:<></>}
              
             <li><NavLink to="/ExplorePost" className="link" >Explore Post</NavLink></li>
             <li><NavLink  onClick={showModelHandler} className={({isActive}) =>(isActive ?"link":"link")}>Log Out</NavLink></li>

       
            
          </ul>
        </div>
        <div>
       
         
        </div> 
        <span className="user-icon" onClick={setEditModel}><p >{userIntial}</p></span>
        <div className="dark">
          <span onClick={ctx.toggleMode}>{ctx.mode == "dark"? "Light" : "Dark"}{props.icon}</span>
          </div>
      </nav>
      {EditModel &&
        <EditPostModel
        onClose={() => setEditModel(false)}
        userId={loggedInuser?.id}
        />
      }
{showModel && (
   <ConfirmationModel 
   title= "Logout?"
   desc= "You Are About To Log Out ,  Are You Sure"
   onclose={hideModelHadler}
   onConfirm={handleLogout}
   confirmBtnText="logout"
   />
)}

    </>
  );
}

export default Navbar;
