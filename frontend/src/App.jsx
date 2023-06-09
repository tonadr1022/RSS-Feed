import { Outlet } from "react-router-dom";
//import "./app.css";
import Header from "./components/ui/Header";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <ToastContainer />
      <div style={{ marginTop: 16 }}>
        <Outlet />
      </div>
    </>
  );
};

export default App;
