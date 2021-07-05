import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks()
    }

    @Post()
    // createTask(@Body() body){ // veya (@Body("title") title: string)gibi
        // nestJS provide us 2 way to supply input both of them use @Body decorator
        // 1st option is entire full body and second one is retrieve titled item in body
        
    createTask(
        @Body("title") title: string,
        @Body("description") description: string
        ): Task{
        return this.tasksService.createTask(title,description)
    }
}
