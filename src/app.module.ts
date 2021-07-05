import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  // controllers: [],
  // providers: [],
  imports: [TasksModule]
})
export class AppModule {}
