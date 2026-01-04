import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

function App() {

  return (
    
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    
  )
}
export default App
