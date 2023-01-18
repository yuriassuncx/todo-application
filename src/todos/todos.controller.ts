import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Uma nova tarefa foi criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
     status: 200,
     description: 'Listagem de tarefas realizada com sucesso',
     type: IndexTodoSwagger,
     isArray: true,
  })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar uma única tarefa pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Listagem de uma tarefa pelo seu ID foi realizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa pelo seu ID não foi encontrada' })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma única tarefa pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa pelo seu ID não foi encontrada' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma única tarefa pelo seu ID' })
  @ApiResponse({ status: 200, description: 'Tarefa removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa pelo seu ID não foi encontrada' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
