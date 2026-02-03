import './Signin.css'
import img4 from '../assets/Images/login.png'
import { toast, ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from "react-router";



function Signin() {
    const[loading,setLoading]=useState(false);
    const [mobileNo, setmobileNo] = useState("");
    const [role, setRole] = useState("");
    const [OTP, setOTP] = useState("");
    const [generateotp, setGenerateOTP] = useState("");
    const navigate = useNavigate()
    var random = Math.floor(1000 + Math.random() * 9000);
    const handleGenerateOtp = () => {
        setOTP(random.toString());
        setGenerateOTP(random.toString());
        alert("One Time Password" + random);
        console.log("Mobile no", mobileNo);
        console.log("Role", role);
        console.log("OTP", generateotp);
    }

    const [mobileNoValidation, setmobileNoValidation] = useState("");
    const [roleValidation, setRoleValidation] = useState("");
    const [OTPValidation, setOTPValidation] = useState("");

    const handlemobileNoChange = (event) => {
        console.log(event.target.value);
        setmobileNo(event.target.value)
    }
    const handleRoleChange = (event) => {
        console.log(event.target.value);
        setRole(event.target.value)
    }
    const handleOTPChange = (event) => {
        console.log(event.target.value);
        setOTP(event.target.value)
    }
 

    const handlesubmit = async (event) => {
        event.preventDefault();
        if (generateotp != OTP) {
            toast.error("Invalid OTP")
            return;
        }
        if (!mobileNo) {
            setmobileNoValidation("! MobailNo.  is reqiured")
        }
        if (!role) {
            setRoleValidation("! Role is reqiured")
        }
        if (!OTP) {
            setOTPValidation("OTP is required");
        }

        if (!mobileNo || !role || !OTP) {
            toast.error("Please fill all fields");
            return;
        }
       
        const formData = {
            mobileNo, role, OTP
        };

        try {
           
                const res = await fetch(
                  "https://696b4bc2624d7ddccaa0bec3.mockapi.io/users"
                );
                const users = await res.json();
                
          
                const existingUser = users.find(
                  (user) => user.mobileNo == mobileNo && user.role == role
                );
          
          
                if (existingUser) {
                    const userExistngData = existingUser;
                  toast.success("Login successful ✅");
                
                     localStorage.setItem("logindata", JSON.stringify(userExistngData));
                    navigate("/");
                 } else{
      
           
            const url = "https://696b4bc2624d7ddccaa0bec3.mockapi.io/users";
        
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(response, "res");
            if (!response.ok) {
                toast.error("Invalid request");
               
            }
        
            const data = await response.json();
            console.log("Form submitted:", data);
        
            toast.success("Login successfully");
            
            setTimeout(() => {
                localStorage.setItem("logindata", JSON.stringify(data));
                navigate("/");
            }, 2000);
       
         }
       } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }


    };
    return (
        <div className='login-container'>
            <div className='login-left'>
                <img src={img4} alt='Login Illustarion' />
            </div>

            <div className='login-right sign'>
                <h2>Hello Again,</h2>
                < p className='subtitle'>Welcome back,let's get start!</p>
                <form onSubmit={handlesubmit}>
                    <input type='text'
                        placeholder="Mobile Number"
                        className="input-field"
                        maxLength={10}
                        pattern='[0-9]{10}'
                        value={mobileNo}
                        onChange={handlemobileNoChange} />
                    {mobileNoValidation && (<p className="error">
                        {mobileNoValidation} </p>)}

                    <select className="input-field"
                        value={role}
                        onChange={handleRoleChange}>
                        <option value="">Select a Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    {roleValidation && (<p className="error">
                        {roleValidation}</p>)}

                    <button className='button' type="button" onClick={handleGenerateOtp} value={OTP}>Generate OTP</button>

                    <input type='text'
                        placeholder='Enter-OTP'
                        className='input-field'
                        maxLength={4}
                        value={OTP}
                        onChange={handleOTPChange} />
                    {OTPValidation && <p className="error">
                        {OTPValidation}</p>}

                    <button className='button' type="submit"  >Login</button>
                    <ToastContainer />
                </form>

            </div>
        </div>
    );
}
export default Signin
