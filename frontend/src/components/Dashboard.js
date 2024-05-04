


import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import "./Dashboard.css"
import {ClipLoader} from "react-spinners"
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading ,setloading]= useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000)
  }, [])

  const [data, setData] = useState({
    uname: "",
    loanAmount: "",
    term: "",
  });
  //get email id which we stored during login
  const mail = localStorage.getItem("email");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const email = localStorage.getItem("email");
    const { uname, loanAmount, term } = data;
    try {
      //Uploading loan application data to loan schema
      const { data } = await axios.post("http://localhost:9000/api/v1/createLoan", {
        uname,
        email,
        loanAmount,
        term,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Applied Successfully...");
        navigate("/status");
      }
    } catch (error) { }
  };
  return (
    <>{
      loading?
      <ClipLoader
        
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
   
    <div className="RequestForm">
      <HeaderUser />
      <div className="request">
      <div className="HeadSection">
            <h6 className="Heading_loan_ap"> Loan Application Form</h6>
            <h3>
              Hello, <span style={{color:"blue"}}>{mail}</span>
            </h3>
      </div>

         <div className="RForm">
            <div className="RTop">
                     <p>Request a Loan</p>
             </div>



          <form onSubmit={handleSubmit}>
            {/* -----------  */}
            <div className="three">
              <label>Full Name</label>
              <div className="ints">
                <input type="text" placeholder="Enter Your Full Name"
                  value={data.uname}
                  onChange={(e) => setData({ ...data, uname: e.target.value })}
                />
              </div>
            </div>
            {/* ------------- */}
            <div className="three">
              <label>Loan Amount (in Rupees)*</label>
              <div className="ints">
                <input type="number" placeholder="Enter the loan amount"
                  value={data.loanAmount}
                  onChange={(e) => setData({ ...data, loanAmount: e.target.value })}
                />
              </div>
            </div>
            {/* -----------  */}
            <div className="three">
              <label>Loan Term (in Weeks)*</label>
              <div className="ints">
                <input type="number"
                  min="0"
                  max="10"
                  placeholder="Enter loan term (in Weeks)"
                  value={data.term}
                  onChange={(e) => setData({ ...data, term: e.target.value })}
                />
                <br />
                <p className="text-red-500">{Error}</p>
              </div>
            </div>
            {/* ------------- */}
            <div className="three">
              <button type='submit'>Ask for Approval</button>
            </div>
          </form>


        </div>
      </div>
    </div>
}
    </>
  );
};

export default Dashboard;