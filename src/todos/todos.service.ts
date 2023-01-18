import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTodoDto) {
    return this.prisma.todos.create({ data });
  }

  findAll() {
    return this.prisma.todos.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.todos.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todos.update({
      where: { id },
      data: {
        task: updateTodoDto.task,
        is_completed: updateTodoDto.is_completed,
        updated_at: updateTodoDto.updated_at,
      },
    });
  }

  remove(id: string) {
    return this.prisma.todos.delete({
      where: { id },
    });
  }
}
