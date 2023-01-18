import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional, IsUUID } from "class-validator";
import { Todo } from "../entities/todo.entity";

export class CreateTodoDto extends Todo {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsString()
    @ApiProperty({
        description: 'The description of a todo',
    })
    task: string;

    @IsBoolean()
    @ApiProperty({
        description: 'The status of a Todo',
        default: false
    })
    is_completed: boolean;
}
