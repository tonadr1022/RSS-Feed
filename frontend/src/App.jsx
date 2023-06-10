import { Outlet } from "react-router-dom";
//import "./app.css";
import Header from "./components/ui/Header";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <ToastContainer />
        <div style={{ margin: 16 }}>
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
