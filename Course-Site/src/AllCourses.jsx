import { useState, useEffect } from "react";
import {Typography} from "@mui/material"

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    async function FetchData() {
      const Fetch = await fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") }
      });
      const Data = await Fetch.json();
      setAllCourses(Data.courses);
    }
    FetchData();
  }, []);
  return (
    <div  style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", margin:"3rem"}}>
    {console.log(allCourses.courses)}
    
      {allCourses.map((c, i) => <CourseList key={i} title={c.title} description={c.description} />
      )}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const CourseList = ({title, description}) => {
  return (
    <div style={{ border:"2px solid #f0f0f0", padding:"2rem", margin:"2rem"}}>
    <Typography textAlign={"center"} variant={"h3"}>
        {title}
    </Typography>
    <Typography textAlign={"center"} margin={"1rem"} variant={"subtitle2"}>
        {description}
    </Typography>
    <img style={{width:"300px"}} src={"https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk="} alt="an image"/>
    </div>
  );
};

export default AllCourses;
