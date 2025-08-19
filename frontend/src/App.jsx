import { useState } from "react";
import Login from "./LoginForm";
import AppDash from "./AppDash";
import { Routes, Route, useNavigate } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useMode, colorModeContext } from "./theme";
import Dashboard from "./scenes/Dashboard";
import Users from "./scenes/user";
import PowerData from "./scenes/powerdata";
import Bar from "./scenes/bar";
import CreateUser from "./scenes/createuser";
import UpdateUser from "./scenes/updateuser";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import CreatePowerData from "./scenes/createpowerdata";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();

  if (localStorage.getItem("access") && loggedIn === false) setLoggedIn(true);

  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  onLoginSuccess={() => {
                    setLoggedIn(true);
                    navigate("/dashboard");
                  }}
                />
              }
            />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/dashboard/*"
                element={<AppDash setLoginState={setLoggedIn} />}
              >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UpdateUser />} />
                <Route path="powerdata" element={<PowerData />} />
                <Route path="create-user" element={<CreateUser />} />
                <Route path="create-power-data" element={<CreatePowerData />} />
                <Route path="bar" element={<Bar />} />
                <Route path="pie" element={<Pie />} />
                <Route path="line" element={<Line />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  );
}

export default App;
