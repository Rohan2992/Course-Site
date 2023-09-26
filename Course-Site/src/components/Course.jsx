import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CourseList } from "./AllCourses";
import { Card, Button, CardContent, TextField } from "@mui/material";

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseBody, setCourseBody] = useState({ title: "", description: "" });
  // const [newcourseBody, setNewCourseBody] = useState("");
  const [data, setData] = useState("");
  // console.log(courseId, data);
  // console.log(courseBody);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/" + courseId, {
      headers: { authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(d => setData(d));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "3rem"
        }}
      >
        {data !== "" &&
          <CourseList title={data.title} description={data.description} />}
      </div>
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
              onChange={e => {
                setCourseBody({ ...courseBody, title: e.target.value });
              }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              margin="dense"
              onChange={e => {
                setCourseBody({ ...courseBody, description: e.target.value });
              }}
            />
            <Button
              style={{
                left: "50%",
                transform: "translate(-50%)",
                margin: "1.5rem 0"
              }}
              variant="contained"
              onClick={() => {
                fetch("http://localhost:3000/admin/courses/" + courseId, {
                  method: "PUT",
                  body: JSON.stringify({ ...courseBody, published: true }),
                  headers: {
                    "content-type": "application/json",
                    authorization: localStorage.getItem("token")
                  }
                })
                  .then(res => res.json())
                  .then(d => console.log(d));
                navigate(0);
              }}
            >
              Update Course
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Course;
