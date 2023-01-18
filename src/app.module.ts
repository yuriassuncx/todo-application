import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TodosModule],
})
export class AppModule {}