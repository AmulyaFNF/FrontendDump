import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Load email from session storage
  const loadEmail = () => {
    const storedEmail = sessionStorage.getItem("email");
    setEmail(storedEmail);
  };

  useEffect(() => {
    loadEmail();

    // Listen for login/logout events
    const handleAuthChange = () => loadEmail();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleEdit = () => {
    if (!email) {
      alert("You have to login to edit your profile");
      return;
    }
    setShowDropdown(false);
    navigate("/edit-profile");
  };

  const handleSignOut = () => {
    setShowDropdown(false);
    sessionStorage.clear();
    setEmail(null);

    // notify navbar
    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  const handleLogin = () => {
    setShowDropdown(false);
    navigate("/login");
  };

  const handleSignUp = () => {
    setShowDropdown(false);
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/Fnf.jpg" alt="Logo" className="navbar-logo-image" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/mission">Mission</Link></li>
        <li><Link to="/careers">Careers</Link></li>
        <li><Link to="/myApplications">My Applications</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li className="user-menu">
          <div
            className="user-icon-wrapper"
            ref={userMenuRef}
            onClick={toggleDropdown}
            style={{ position: "relative" }}
          >
            <img
              src="/images/icon.jpeg"
              alt="User Icon"
              className="user-icon-image"
            />
            {showDropdown && (
              <div className="dropdown">
                {email ? (
                  <>
                    <p className="email-text"><strong>Email:</strong> {email}</p>
                    <button onClick={handleEdit}>Edit Profile</button>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleSignUp}>Sign Up</button>
                    <button onClick={handleLogin}>Login</button>
                  </>
                )}
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
