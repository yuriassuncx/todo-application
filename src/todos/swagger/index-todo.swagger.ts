import { PartialType } from "@nestjs/swagger";
import { Todo } from "../entities/todo.entity";

export class IndexTodoSwagger extends PartialType(Todo) {}