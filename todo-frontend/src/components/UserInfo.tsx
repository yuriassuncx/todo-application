import { Toggle } from "./Toggle";

import { useApplication } from '../hooks/useApplication';

import moment from "moment";

export function UserInfo() {
    const { data: todayTodos, theme } = useApplication();
    
    const today = new Date();

    return (
        <div className="hidden lg:flex flex-col p-6 dark:bg-slate-800 gap-3 text-zinc-700 dark:text-white shadow-xl w-80 h-screen">
            <h1 className="pt-3 text-center text-xl font-bold tracking-wide">Olá, Usuário!</h1>

            <div className="flex mt-12 mb-12 mx-4 items-center justify-between font-bold text-lg">
                <p>{theme === 'dark' ? 'LightMode' : 'DarkMode'}:</p>
                <Toggle />
            </div>

            <div className="border-t border-slate-600 mt-1" />

            <h1 className="font-bold text-xl pb-2">Tarefas de hoje:</h1>

            <div className="flex flex-col gap-3 h-[560px] overflow-hidden hover:overflow-auto scrollbar">
                {todayTodos?.filter((item) => moment(item?.created_at).format('DD/MM/YYYY') === today.toLocaleDateString()).map((todo) => (
                    <div 
                        key={todo.id}
                        className="flex flex-col gap-2 bg-violet-500 py-2 px-4 font-bold rounded-md text-white cursor-pointer"
                    >
                        <h1>{todo.task}</h1>
                        {todo.is_completed ? (
                            <div className="flex py-1 w-24 justify-center bg-green-400 rounded-lg">Completa</div>
                        ) : (
                            <div className="flex py-1 w-24 justify-center bg-yellow-500 rounded-lg">Incompleta</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
