import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";

import { Sidebar } from "./components/Sidebar";
import { UserInfo } from "./components/UserInfo";
import { useApplication } from "./hooks/useApplication";

export function App() {
  const { activeMenu } = useApplication();

  return (
    <BrowserRouter>
      <div className="flex md:justify-between">
        <div className={`${activeMenu ? 'w-72' : 'w-0'} fixed md:sticky sidebar duration-75 ease-in bg-white dark:bg-slate-800 z-10`}>
          <Sidebar />
        </div>
        <Router />
        <div className="flex sidebar">
          <UserInfo />
        </div>
      </div>
    </BrowserRouter>
  )
}
