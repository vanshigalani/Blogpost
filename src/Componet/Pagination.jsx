import { useContext } from "react";
import { ModeContext } from "../Cotext/ModeContext";
import "./Pagination.css";

export default function Pagination(props) {
  const {CurrentPage ,totalPages,onNext,onPrev,setPostPerPage,PostPerPage} = props
         const ctx = useContext(ModeContext);
  
    return (
      <div className={`pagination ${ctx.mode}`}>
              <select 
              value={PostPerPage}
              onChange={(e) => setPostPerPage(Number(e.target.value))}>
                         <option value="10">10</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="15">15</option>
                        <option value="18">18</option>
                        <option value="21">21</option>
                    </select>
        <button className="page-btn"
         onClick={onPrev}
         disabled={CurrentPage ==1}>PREV</button>
  
        <label className="page-info">
        {CurrentPage} to {totalPages}</label>
  
        <button className="page-btn"
        onClick={onNext}
        disabled={CurrentPage === totalPages}>NEXT</button>
      </div>
    );
  }
  