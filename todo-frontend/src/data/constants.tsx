import { BookBookmark, Bookmarks, CheckSquareOffset, Cloud } from "phosphor-react";

export const navData = [
    {
        id: 1,
        name: "Todas as tarefas",
        path: '/',
        icon: <BookBookmark size={20} />
    },
    {
        id: 2,
        name: "Tarefas realizadas",
        path: '/done',
        icon: <CheckSquareOffset size={20} />
    },
    {
        id: 3,
        name: "Tarefas do dia",
        path: '/today',
        icon: <Bookmarks size={20} />
    },
    {
        id: 4,
        name: "Tarefas Importantes",
        path: '/importants',
        icon: <Cloud size={20} />
    },
];
