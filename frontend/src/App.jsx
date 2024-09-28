import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import SingleProduct from "./admin/SingleProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/product" element={<SingleProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
