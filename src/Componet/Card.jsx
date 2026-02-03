import { useContext } from 'react';
import './Card.css'
import { ModeContext } from '../Cotext/ModeContext';

const Card = (props) => {
  const loggedInuser = JSON.parse(localStorage.getItem("logindata")) || {};

  
 const ctx = useContext(ModeContext);


  return (
    <>
         
    <div className={`card ${ctx.mode }`}>
    
        <div className="card-content " onClick={props.onRedirect}>
          <img className='img1' src={props.img ? props.img : `https://picsum.photos/id/${props.id}/300/300 `} alt={props.title} />
          <h1 className='h2t'>{props.title}</h1>
          <p>
            {props.desc?.length > 100
              ? props.desc.substring(0, 100) + "..."
              : props.desc || ""}
          </p>

        </div>
        {/* {props.from !== "explore" &&  */}
        <div>
          {loggedInuser?.role === "Admin" && (
            <div className='newbtn'>
              <button className="btn1 btn2" onClick={props.onEdit}>
                Edit
              </button>

              <button className="btn1 btn3" onClick={props.onDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
        {/* // } */}
      </div>

    </>
  )
}

export default Card
