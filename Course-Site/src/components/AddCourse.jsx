import { Card, Button, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AddCourse = () => {
  const [course, setCourse] = useState({ title: "", description: "" });
  const [exist, setExist ] = useState(null);

  console.log(course);
  return (
    <>
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
              label="Title"
              variant="outlined"
              margin="dense"
              onChange={(e) => {
                setCourse({ ...course, title: e.target.value });
              }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              margin="dense"
              onChange={(e) => {
                setCourse({ ...course, description: e.target.value });
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
                fetch("http://localhost:3000/admin/courses", {
                  method: "POST",
                  body: JSON.stringify({...course, "published": true}),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token")
                  }
                })
                  .then((res) => res.json())
                  .then((d) => {if(d.message === "Course already exists and cannot be created"){
                        setExist("Course already exists and cannot be created");
                  }else{alert("Course Added!!!")}});
              }}
            >
              Add Course
            </Button>
            <Typography textAlign={"center"}>
            {(exist !== null)
              ? "Course already exists and cannot be created"
              : ""}
            <br />
          </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddCourse;
