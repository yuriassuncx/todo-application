import { Prisma } from "@prisma/client";

export class Todo implements Prisma.TodosUncheckedCreateInput {
    id?: string;
    task: string;
    is_completed: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;
}
