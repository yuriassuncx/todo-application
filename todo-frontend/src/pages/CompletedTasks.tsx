import { useState } from "react";

import { TodoCard } from "../components/TodoCard";
import { NewTask } from "../components/NewTask";

import { useApplication } from "../hooks/useApplication";
import { Navbar } from "../components/Navbar";

export type Todo = {
    id?: string;
    task: string;
    is_completed: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;
}

export function CompletedTasks() {
    const [search, setSearch] = useState("");
    const [isOpenedModal, setIsOpenedModal] = useState(false);

    const { data, error, isLoading } = useApplication();

    if (isLoading) return <div className="dark:text-white p-2">Carregando...</div>;

    if (error) return <div className="dark:text-white p-2">Algo deu errado...</div>;

    return (
      <>
        <div className="flex flex-1 flex-col h-full lg:h-[90vh] justify-start lg:items-center xl:items-stretch gap-3 mt-12 py-4 px-2 lg:px-6 dark:text-white/95">
          <Navbar search={search} setSearch={setSearch} setIsOpenedModal={setIsOpenedModal} />

          <div className="flex justify-center md:justify-start text-xl font-bold">
            {search.length > 1 ? (
              <p>Pesquisando...</p>
            ) : (
              <div className="flex gap-1">
                <h1>Tarefas Completadas</h1>
                <p>({data?.filter((item) => item.is_completed === true).length}/{data?.length} {data!.length > 1 ? 'Tarefas' : 'Tarefa'})</p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 justify-center gap-x-3 px-2 lg:px-6 gap-y-4 py-12 scrollbar lg:overflow-hidden lg:hover:overflow-auto overflow-x-hidden">
            {data?.filter((item) => item.task.toLowerCase().includes(search.toLowerCase()) && item.is_completed === true)?.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        </div>

        <NewTask isOpenedModal={isOpenedModal} setModal={setIsOpenedModal} />
      </>
    )
}