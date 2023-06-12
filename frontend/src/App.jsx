import { Outlet } from "react-router-dom";
//import "./app.css";
import Header from "./components/ui/Header";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useMemo, useState } from "react";

// From mui site
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#f3f3f3" : "#121212",
            paper: mode === "light" ? "#d6d6d6" : "#121212",
          },
          // primary: {
          //   main: "#00845a",
          // },
          // secondary: {
          //   main: "#84002a",
          // },
        },
      }),
    [mode]
  );
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <ToastContainer />
          <div style={{ margin: 16 }}>
            <Outlet />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
