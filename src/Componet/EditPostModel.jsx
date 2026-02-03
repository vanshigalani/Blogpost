  import { useContext, useEffect, useState } from 'react';
  import './EditPostModel.css';
  import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../Cotext/ModeContext';

  const EditPostModel = ({onClose,userId}) => {
      const navigate = useNavigate(); 
    const [EditPostModel, setEditPostModel] = useState({
      fullName: "",
      mobileNo: "",
      role: "",
      OTP : "",
    });
    const ctx = useContext(ModeContext);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    

    // Fetch user when modal opens
    useEffect(() => {
      if (userId) {
        fetchUserById();
      }
    }, [userId]);

    
    const fetchUserById = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://696b4bc2624d7ddccaa0bec3.mockapi.io/users/${userId}`
        );
        const data = await response.json();
        setEditPostModel({
          fullName: data?.fullName || "",
          mobileNo: data?.mobileNo || "",
          role: data?.role || "",
          OTP: data?.OTP,});
      } catch (error) {
        console.error("Fetch user error:", error);
      } finally {
        setLoading(false);
      }
    };
    

    // Handle input change
    const handleChange = (e) => {
      setEditPostModel({
        ...EditPostModel,
        [e.target.name]: e.target.value,
      });
    };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const newError = {};
      if (!EditPostModel.fullName.trim()) newError.fullName = "Full Name is required";
      if (!EditPostModel.mobileNo.trim()) newError.mobileNo = "Mobile No is required";
      
      if (Object.keys(newError).length > 0) {
        setError(newError);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          `https://696b4bc2624d7ddccaa0bec3.mockapi.io/users/${userId}`,
          {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(EditPostModel), 
          }
        );

        if (response.ok) {
          alert("somthing wrong!");
        }
        const upadted= await response.json();
        console.log(upadted)
          localStorage.setItem("logindata", JSON.stringify(upadted));

          alert("Profile updated successfully!");
          onClose(); 
        } 
       catch (error) {
        console.error("Update error:", error);
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className={`model-Edit ${ctx.mode}`}>
        <div className="model">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              className="input"
              value={EditPostModel.fullName}
              onChange={handleChange}
            /><br/>
            {error.fullName && <span className="error">{error.fullName}</span>}

            <input
              type="text"
              name="mobileNo"
              placeholder="Enter Mobile No."
              className="input"
              value={EditPostModel.mobileNo}
              onChange={handleChange}
            /><br/>
            {error.mobileNo && <span className="error">{error.mobileNo}</span>}

            <select
              name="role"
              className="input"
              disabled
              value={EditPostModel.role}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select><br/>
            {error.role && <span className="error">{error.role}</span>}

            <input
              type="text"
              name="OTP"
              placeholder="Enter OTP"
              disabled
              className="input"
              value={EditPostModel.OTP}
              onChange={handleChange}
            /><br/>
            {error.OTP && <span className="error">{error.OTP}</span>}

            <div className="model-action">
              <button type="button" className="bttn bttn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="bttn bttn-save">
              Save
              </button><br/>
            </div>

          </form>
        </div>
      </div>
    );
  };

  export default EditPostModel;
