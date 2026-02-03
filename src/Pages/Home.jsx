import Card from "../Componet/Card";
import { useState,useEffect, useContext } from 'react';
import ConfirmationModel from "../Componet/ConfirmationModel";
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import Snowfall from 'react-snowfall'
import { ModeContext } from "../Cotext/ModeContext";



const Homepage = () => {


  const navigate = useNavigate()
    const [postdata, setPostdata] = useState([]);

     const ctx = useContext(ModeContext);
    const [showModal, setShowModal] = useState(false); 
    const [selectedIndex, setSelectedIndex] = useState(null);
    
  
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("postData")) || [];
      setPostdata(data);
    }, []);
  
    const openDeleteModel = (index) => {
      console.log("Opening modal for index:", index);
      setSelectedIndex(index);
      setShowModal(true);
    };

    const clickHandler=(id)=>{
      navigate(`${id}`);
    }
  
  
    const confirmDelete = () =>{
      const updatePostData = postdata.filter((_, i) => i !==selectedIndex);
      console.log(updatePostData, "updtaeddata")
      setPostdata(updatePostData);
      localStorage.setItem("postData",JSON.stringify(updatePostData));
      setShowModal(false);
    };
    const handaleEdit  = (id) => {
      console.log({id});
      navigate("/Post" , { state: {id} });
    }
   
  return (
    <>
 <div className={`container ${ctx.mode }`}>
    
      <Snowfall className='snow'
       color="black"
       snowflakeCount={200}/>
      

      <div className='container'>
      {postdata.length === 0 ? (
          <p style={{
              justifyContent:"center", 
               marginLeft:"370px" ,          
              fontSize: "40px"}} >
            <Link to="/Post" className="link">No posts found.Please add a new post.</Link> 
          </p>
        ) : (
          postdata.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              desc={item.body}
              img={item.image}
              onRedirect={() => clickHandler(item.id)}
              onDelete={() => openDeleteModel(index)}
              onEdit={() => handaleEdit(item.id)}
              

            />
            
          ))
        )}
        </div>
      </div>
     

      {showModal && (
        <ConfirmationModel
        title="delete?"
        desc="you are sure you want to delete this post? 
        this action cannot be undone"
        onclose={() =>setShowModal(false) }
        onConfirm={confirmDelete}
        confirmBtnText="Delete"
        />
      )}
      
    </>
  );
}

export default Homepage;