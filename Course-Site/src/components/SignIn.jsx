import Card from "@mui/material/Card";
import { TextField, Typography, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [userBody, setUserBody] = useState({ username: "", password: "" });
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
            onChange={e => {
              setUserBody({ ...userBody, username: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="password"
            type="password"
            variant="outlined"
            margin="dense"
            onChange={e => {
              setUserBody({ ...userBody, password: e.target.value });
            }}
          />
          <Button
            style={{
              left: "50%",
              transform: "translate(-50%)",
              margin: "1.5rem 0 "
            }}
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/login", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  username: userBody.username,
                  password: userBody.password
                }
              })
                .then(response => {
                  return response.json();
                })
                .then(data =>
                  localStorage.setItem("token", "Bearer " + data.token)
                );
              window.location = "/signIn";
            }}
          >
            Sign In
          </Button>
          <Link to="/">
            <Typography textAlign={"center"}>Create An Account</Typography>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
