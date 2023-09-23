import { Typography, Button } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavMenu = () => {
  const [showEmail, setShowEmail] = useState(null);
  console.log(showEmail);

  useEffect(function() {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(d => {
        setShowEmail(d?.user);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "0px 0px 20px 0px",
        padding: "2rem",
        outline: "2px solid #f0f0f0"
      }}
    >
      <Typography variant="h5">Courses-Website</Typography>
      {showEmail === null || showEmail === undefined
        ? <div>
            <Link to={"/"}>
              <Button variant="contained">Sign Up</Button>
            </Link>
            <Link to={"/signIn"}>
              <Button variant="contained" style={{ margin: "0px 5px" }}>
                Sign In
              </Button>
            </Link>
          </div>
        : <div>
            <Button
              style={{ backgroundColor: "white", color: "black" }}
              variant="contained"
            >
              <Person2Icon style={{ margin: "3px 10px" }} /> {showEmail}
            </Button>
            <Button
              variant="contained"
              style={{ margin: "0px 5px" }}
              onClick={() => {
                localStorage.setItem("token", null);
                setShowEmail(null);
              }}
            >
              Sign Out
            </Button>
          </div>}
    </div>
  );
};

export default NavMenu;
