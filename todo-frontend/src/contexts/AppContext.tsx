import { createContext, useEffect, useState } from "react";
import { api } from "../utils/api";

import useSWR, { KeyedMutator } from 'swr';

interface Todo {
    id?: string;
    task: string;
    is_completed: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;
}

type AuthContextType = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
    data: Todo[] | undefined;
    error: string;
    isLoading: boolean;
    mutate: KeyedMutator<Todo[]>;
    activeMenu: boolean;
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

type ChildrenProps = {
    children: React.ReactNode;
}

export const ThemeContext = createContext({} as AuthContextType);

export function ThemeProvider({ children }: ChildrenProps) {
    const [theme, setTheme] = useState<'dark' | 'light'>(
        localStorage.getItem("theme") !== "dark" ? "light" : "dark"
    );

    const [activeMenu, setActiveMenu] = useState(true); 
    const { data, error, isLoading, mutate } = useSWR<Todo[]>('/api/todos', api.getTodos);

    useEffect(() => {
        const root = window.document.documentElement;

        const oldTheme = theme === 'dark' ? 'light' : 'dark';

        root.classList.remove(oldTheme);
        root.classList.add(theme);
        
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, data, error, isLoading, mutate, activeMenu, setActiveMenu }}>
            {children}
        </ThemeContext.Provider>
    )
}

