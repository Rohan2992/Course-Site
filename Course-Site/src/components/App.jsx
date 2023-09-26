import NavMenu from "./NavMenu";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddCourse from "./AddCourse";
import AllCourses from "./AllCourses";
import Course from "./Course";
import ScanQr from "./ScanQr";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div style={{ margin: "15px 50px" }}>
        <Router>
          <NavMenu />
          <Routes>
            <Route path={"/scan"} element={<ScanQr />} />
            <Route path={"/"} element={<SignUp />} />
            <Route path={"/SignIn"} element={<SignIn />} />
            <Route path={"/addCourse"} element={<AddCourse />} />
            <Route path={"/allCourses"} element={<AllCourses />} />
            <Route path={"/courses/:courseId"} element={<Course />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
