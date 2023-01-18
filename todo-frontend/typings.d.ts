export type Todo = {
    id: string;
    task: string;
    is_completed: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}