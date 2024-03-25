import "./App.css";
import "./Assets/Styles/common.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Pages/Dashboard";
import CreateAgentlogin from "./Pages/CreateAgentlogin";
import Agentlogin from "./Pages/AgentLogin";
import LiveChats from "./Pages/LiveChats";
import LiveAgent from "./Pages/LiveUserChat";
import Configure from "./Pages/Configure";
import routesPath from "./Routes";
import Toaster from "./Components/Toaster";
import Landingpage from "./Pages/Landingpage";
import LiveAgentChats from "./Pages/LiveAgentChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routesPath.default} element={<Landingpage />} />
        <Route path={routesPath.createAccount} element={<SignUp />} />
        <Route path={routesPath.agentLogin} element={<Agentlogin />} />
        <Route
          path={routesPath.createagentlogin}
          element={<CreateAgentlogin />}
        />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path={routesPath.dashboard} element={<Dashboard />} />
        <Route path={routesPath.livechat} element={<LiveChats />} />
        <Route path={routesPath.liveagent} element={<LiveAgent />} />
        <Route path={routesPath.liveagentchat} element={<LiveAgentChats />} />
        <Route path={routesPath.configure} element={<Configure />} />
        <Route path={routesPath.login} element={<Login />} />
        {/* </Route> */}
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
