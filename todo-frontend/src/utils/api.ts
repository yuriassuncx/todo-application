import axios from "axios";

import { Todo } from "../pages/HomePage";

async function getTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>('http://localhost:3333/todos');

    return response.data;
}

async function postTodo(): Promise<Todo> {
    const response = await axios.post<Todo>('http://localhost:3333/todos');

    return response.data;
}

async function updateTodoById(todoId: string): Promise<Todo> {
    const response = await axios.patch<Todo>(`http://localhost:3333/todos/${todoId}`);

    return response.data;
}

async function deleteTodoById(todoId: string): Promise<Todo> {
    const response = await axios.delete<Todo>(`http://localhost:3333/todos/${todoId}`);

    return response.data;
}

export const api = {
    getTodos,
    postTodo,
    updateTodoById,
    deleteTodoById,
};