import NavMenu from "./components/NavMenu";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddCourse from "./components/AddCourse";
import AllCourses from "./AllCourses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   
  return (
    <>
      <div style={{ margin: "15px 50px" }}>
        <Router>
            <NavMenu />
          <Routes>
            <Route path={"/"} element={<SignUp />} />
            <Route path={"/SignIn"} element={<SignIn />} />
            <Route path={"/addCourse"} element={<AddCourse />} />
            <Route path={"/allCourses"} element={<AllCourses />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
