import NavMenu from "./components/NavMenu";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
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
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
