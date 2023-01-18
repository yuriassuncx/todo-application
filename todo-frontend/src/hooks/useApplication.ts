import { useContext } from "react";
import { ThemeContext } from "../contexts/AppContext";

export function useApplication() {
    const context = useContext(ThemeContext);

    return context;
}