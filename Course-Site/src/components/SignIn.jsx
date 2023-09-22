import Card from "@mui/material/Card";
import { TextField, Typography, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

const SignIn = () => {
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
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="password"
            type="password"
            variant="outlined"
            margin="dense"
          />
          <Button
            style={{
              left: "50%",
              transform: "translate(-50%)",
              margin: "1.5rem 0 "
            }}
            variant="contained"
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
