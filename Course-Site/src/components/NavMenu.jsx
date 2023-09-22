import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "space-between",
        margin: "0px 0px 20px 0px",
        padding :"2rem",
        outline: "2px solid #f0f0f0"
      }}
    >
      <Typography variant="h5">Courses-Website</Typography>

      <div>
      <Link to={"/"}>
        <Button variant="contained">Sign Up</Button>
      </Link>
      <Link to={"/signIn"}>
        <Button variant="contained" style={{ margin: "0px 5px" }}>
          Sign In
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
