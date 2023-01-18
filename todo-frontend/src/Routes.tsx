import { Route, Routes } from "react-router-dom";
import { CompletedTasks } from "./pages/CompletedTasks";

import { HomePage } from "./pages/HomePage";
import { ImportantsTasks } from "./pages/ImportantsTasks";
import { TodayTasks } from "./pages/TodayTasks";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/done" element={<CompletedTasks />} />
            <Route path="/today" element={<TodayTasks />} />
            <Route path="/importants" element={<ImportantsTasks />} />
        </Routes>
    )
}
