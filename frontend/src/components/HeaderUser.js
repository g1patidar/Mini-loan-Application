import { Link, useNavigate } from "react-router-dom";
import "./HeaderUser.css";
import { useState } from "react";

const HeaderUser = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

   const handleSignOut = () => {
    localStorage.setItem("email", "");
    navigate("/login");
  };

   const handleAlert = () => {
    if (window.confirm("Are you sure you want to sign-out!")) {
      var txt = "You pressed OK!";
      handleSignOut();
    } else {
      var txt = "You pressed Cancel!";
    }
  };

  return (
    <div className="Navbar">
      <div className="nav">
        <div className="navTop">
          <div className="mainLogo">Loan App</div>
          <div className="menuBar" onClick={toggleDropdown}>
            <i className="ri-menu-line"></i>
          </div>
          <div className={`navLinks ${isDropdownOpen ? "show" : ""}`}>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/dashboard">
              Home
            </Link>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/pay">
              Pay Repayment
            </Link>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/status">
              Loan Details
            </Link>
          </div>
          <div onClick={() => {handleAlert();}} className={`user ${isDropdownOpen ? "show" : ""}`}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;

