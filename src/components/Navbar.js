import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = ({ user }) => {
  console.log(user);
  const history = useHistory();
  const logoutHandler = () => {
    auth.signOut();
    history.push("/login");
  };
  return (
    <>
      <nav>
        <div
          className="nav-wrapper light-blue darken-4"
          style={{ padding: "0 10px" }}
        >
          <Link to="#" className="brand-logo">
            Todo
          </Link>
          <ul id="nav-mobile" className="right">
            {user ? (
              <li>
                <button className="btn light-blue" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
