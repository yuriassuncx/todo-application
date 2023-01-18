import { useState } from "react";
import { Todo } from "../pages/HomePage";

import moment from "moment";

import { DeleteTask } from "./DeleteTask";
import { UpdateTask } from "./UpdateTask";

import { CalendarCheck, DotsThreeVertical, Star, Trash } from "phosphor-react";

interface TodoCardProps {
    todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
    const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
    const [isOpenedUpdateModal, setIsOpenedUpdateModal] = useState(false);

    return (
        <>
        <div className="flex flex-col w-[325px] sm:w-[345px] h-[220px] text-white p-4 font-bold bg-violet-500 rounded-md cursor-pointer hover:scale-105 transition ease-in duration-150 shadow-lg">
            <h1 className="tracking-wide leading-6">{todo.task}</h1>

            <span className="flex items-center gap-1 text-sm mt-16 mb-3">
                <CalendarCheck size={24} />
                <p>{moment(todo.created_at).format('DD/MM/YYYY, hh:mm')}h</p>
            </span>

            <div className="flex items-center justify-between border-t border-slate-400 text-slate-50 pt-4">
                {todo.is_completed ? (
                    <div className="flex items-center p-2 bg-green-400 rounded-lg">Completa</div>
                ) : (
                    <div className="flex items-center p-2 bg-yellow-500 rounded-lg">Incompleta</div>
                )}
                <div className="relative flex gap-1">
                    <Star size={32} className="hover:bg-violet-400 rounded-full p-1" />
                    <Trash size={32} className="hover:bg-violet-400 rounded-full p-1" onClick={() => setIsOpenedDeleteModal(true)} />
                    {todo.is_completed ? (
                        <DotsThreeVertical size={32} className="hover:bg-violet-400 rounded-full p-1 opacity-40" />
                    ) : (
                        <DotsThreeVertical size={32} className="hover:bg-violet-400 rounded-full p-1" onClick={() => setIsOpenedUpdateModal(true)} />
                    )}
                </div>
            </div>
        </div>

        <DeleteTask id={todo.id} task={todo.task} isOpenedModal={isOpenedDeleteModal} setModal={setIsOpenedDeleteModal} />
        <UpdateTask id={todo.id} task={todo.task} isCompleted={todo.is_completed} isOpenedModal={isOpenedUpdateModal} setModal={setIsOpenedUpdateModal} />
        </>
    )
}