import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./SignIn.css"
import SignUpImg from "../utils/SignUpImg.webp";

const SignIn = () => {
  const navigate = useNavigate();
  // const [ role, setrole]  = useState('')

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    try {
      //checking the login credentials
      const { data } = await axios.post("http://localhost:9000/api/v1/login", {
        email,
        password,
      });
      
      if (data.err) {
        toast.error(data.err);
      } else {
        setData({});
        localStorage.setItem("role", data.user.role);
        toast.success("Login Successfully...");
        localStorage.setItem("email", email);

        if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role !== "admin") {
          navigate("/dashboard");
        }
      }
    } catch (error) { }
  };

  return (

    <div>
      <div className="LogIn">
        <div className="Login">

          <div className="LoginLeft">
            <h5>Mini Loan App</h5>
            <p>Welcome to Oue Website! Please sign in to take the loan.</p>
            <img src={SignUpImg} alt="" />
          </div>
          <div className="LoginRight">
            <div className="Top">
              <h3>Sign In to Take Loans<span>!</span></h3>
              <p>start for free/create an account</p>
            </div>
            <div className="LoginMedium">
              <form onSubmit={HandleLogin}>

                <div className="two">
                  <label>Email</label>
                  <div className="int">
                    <i class="ri-user-fill"></i>
                    <input type="email" name='email'
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="Enter Your Email" />
                  </div>
                </div>
                <div className="two">
                  <label>Password</label>
                  <div className="int">
                    <i class="ri-git-repository-private-fill"></i>
                    <input type="password" name='password'
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      placeholder="Type Your Password" />
                  </div>
                </div>

                <div className="two">
                  <button type="submit">Sign in</button>
                </div>
                <div className="line2">
                  <p >Don't have any account? <Link to='/'>SignUp</Link></p>
                </div>
              </form>
            </div>

          </div>


        </div>
      </div>
    </div>


  );
};

export default SignIn;
