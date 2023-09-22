import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const LogIn = () => {
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
          width: "800",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
            margin="dense"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
            margin="dense"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Image-Url    "
            variant="outlined"
            margin="dense"
          />

          <Button variant="contained">ADD COURSE</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogIn;
