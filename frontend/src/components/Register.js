import { useState } from "react";
import axios from "axios";
import "./Register.css"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignUpImg from "../utils/SignUpImg.webp";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    uname: "",
    email: "",
    password: "",
  });
  const HandleRegister = async (e) => {
    e.preventDefault();

    const { uname, email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:9000/api/v1/register", {
        uname,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registered Successfully...");
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    // ---------------------------
    <div>
    <div className="Joinnow">
         <div className="Join">
         <div className="JoinLeft">
             <h5>Mini Loan App</h5>
             <p>Please register to take the loans you wish to take up.</p>
           <img src={SignUpImg} alt="" />
         </div>
         <div className="JoinRight">
                 <div className="Top">
                       <h3>Sign Up to Take Loans <span>!</span></h3>
                       <p>start for free/ create an account</p>
                 </div>
                 <div className="Medium">
                       <form  onSubmit={HandleRegister}>
                           <div className="one">
                                 <label>Username</label>
                                 <div className="int">
                                 <i class="ri-user-fill"></i>        
                                 <input type="text" name='name' value={data.uname} placeholder="Username" onChange={(e) => setData({ ...data, uname: e.target.value })}  />
                                 </div>
                           </div>
                          
                           <div className="one">
                                 <label>Email address</label>
                                 <div className="int">
                                 <i class="ri-user-fill"></i>        
                                 <input type="email" name='email' value={data.email}  placeholder="Enter Your Email"   onChange={(e) => setData({ ...data, email: e.target.value })} />
                                 </div>
                           </div>
                           <div className="one">
                                 <label>Password</label>
                                 <div className="int">
                                 <i class="ri-git-repository-private-fill"></i>     
                                 <input type="password" value={data.password} name='password' placeholder=" Password"   onChange={(e) => setData({ ...data, password: e.target.value })} />
                                 </div>
                           </div>
                             
                           <div className="one">
                           <button type='submit'>Create account</button>
                           </div>
                           <div className="line">
                                 <p onClick={() => navigate("/login")}>Already you have an account? <a href="/login">Sign in</a></p>
                           </div>
                       </form>
                 </div>
                 
         </div>


</div>
</div>
</div>
    
  );
};

export default Register;
