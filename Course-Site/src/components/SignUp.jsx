import { useState } from "react";
import Card from "@mui/material/Card";
import { TextField, Typography, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import "./index.css";

const SignUp = () => {
  const [userBody, setUserBody] = useState({ username: "", password: "" });
  const [registered, setIsRegstered] = useState(false);

  // useEffect(() => {
  //   function FetchData() {

  //   }
  //   FetchData();
  // }, []);
  // console.log("Data - ", data);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card
        style={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          marginTop: "5rem"
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            margin="dense"
            onChange={e =>
              setUserBody({ ...userBody, username: e.target.value })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="password"
            type="password"
            variant="outlined"
            margin="dense"
            onChange={e =>
              setUserBody({ ...userBody, password: e.target.value })}
          />
          <Button
            style={{
              left: "50%",
              transform: "translate(-50%)",
              margin: "1.5rem 0 "
            }}
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify(userBody),
                headers: { "content-type": "application/json" }
              })
                .then(res => {
                  return res.json();
                })
                .then(data => {
                  if (data.message === "Admin already exists") {
                    setIsRegstered(true);
                  }
                  localStorage.setItem("Authorization", "Bearer " + data.token);
                  // setData(data);
                });
            }}
          >
            Create An Account
          </Button>
          <Typography textAlign={"center"}>
            {registered
              ? "Already Registered, Try SignIn Instead"
              : "Already have a account? "}
            <br />
            <Link to="/signIn">Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
