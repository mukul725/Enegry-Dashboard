import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Outlet } from "react-router";
import { PowerDataProvider } from "./services/powerDataContext";

function AppDash({ setLoginState }) {
  return (
    <PowerDataProvider>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar setLoginState={setLoginState} />
          <Outlet />
        </main>
      </div>
    </PowerDataProvider>
  );
}

export default AppDash;
