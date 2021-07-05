import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get() // we will get filter as query ?xxx=yyyy gibi
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto)
        } else{
            return this.tasksService.getAllTasks()
        }
    }

    @Post()
    // createTask(@Body() body){ // veya (@Body("title") title: string)gibi
        // nestJS provide us 2 way to supply input both of them use @Body decorator
        // 1st option is entire full body and second one is retrieve titled item in body
        
    // createTask(
        // @Body("title") title: string,
        // @Body("description") description: string bunlar yerin artik DTO larimiz var
        createTask(@Body() createTaskDto : createTaskDto): Task{
        return this.tasksService.createTask(createTaskDto)
    }
    @Get('/:id') //burda / yazmamiz cok onemli degil
    getTaskById(@Param('id') id : string): Task{
        return this.tasksService.getTaskById(id)
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string): void{
        return this.tasksService.deleteTask(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(
        @Param("id") id: string,
        @Body("status") status: TaskStatus
    ): Task{ 
        return this.tasksService.updateTaskStatus(id, status)
    }
}
