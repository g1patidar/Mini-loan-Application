import axios from "axios";
import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css"

const AdminPanel = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [j , setj]= useState(0);
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  if (role !== "admin") navigate("/login");
  useEffect(() => {
    //making get request to get all user who applied for loan
    axios.get("http://localhost:9000/api/v1/getApplicants").then(function (response) {
      setData(response.data.loan);
    });
  }, [j]);

  //applying extra layer of security
  const handleAlertApprove = (state, _id) => {
    setj(j+1)
    if (window.confirm("Are you sure you want to approve the loan!")) {
      var txt = "You pressed OK!";
      
      handleUpdateApprove(state, _id, "APPROVED");
    } else {
      var txt = "You pressed Cancel!";
    }
  };
   //applying extra layer of security
  const handleAlertReject = (state, _id) => {
    
    if (window.confirm("Are you sure you want to reject the loan!")) {
      var txt = "You pressed OK!";
      
      handleUpdateReject(state, _id, "REJECTED");
    } else {
      var txt = "You pressed Cancel!";
    }
  };
  const handleUpdateApprove = async (state, _id, status) => {
    await axios.put("http://localhost:9000/api/v1/update", {
      state,
      _id,
      status,
    }).then(()=>setj(j+1));
  };
  const handleUpdateReject = async (state, _id, status) => {
     await axios.put("http://localhost:9000/api/v1/update", {
      state,
      _id,
      status,
    }).then(()=>setj(j+1));
  };

  return (
    <div className="AdminPanel">
      <HeaderAdmin />
      <h1 className="text-4xl font-serif font-semibold mb-2 mt-3">
          ADMIN PANEL
        </h1>
     <div className="admin">

     <div className="AdminSection">
            <h5>All Loans</h5>
            <h3>
              Hello {email}
            </h3>
      </div>

      <div className="adminMain">
        {/* mapping our each loan request */}
        {data.map((val) => {
          return (
            <div
              key={val._id}
              className="adminForm"
            >
              <ul>
                <li><span>Name:</span> <small>{val.uname}</small></li>
                <li><span>Email:</span> <small>{val.email}</small></li>
                <li><span>Loan Amount:</span> <small>{val.loanAmount}</small></li>
                <li><span>Term(in Weeks):</span><small>{val.term}</small></li>
                <li><span>Status:</span><small>{val.state}</small></li>
                </ul>
                <div className="adminBtns">
                  <button
                     className="approve"
                    onClick={() => {
                      handleAlertApprove(val.state, val._id)
                    }}
                  >
                    Approve
                  </button>
                  <button
                  className="reject"
                    onClick={() => {
                      handleAlertReject(val.state, val._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              
            </div>
          );
        })}
      </div>

     </div>
    </div>
  );
};

export default AdminPanel;