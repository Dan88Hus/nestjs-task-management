import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
// import { Task, TaskStatus } from './tasks.model'; DB we will use
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get() // we will get filter as query ?xxx=yyyy gibi
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{
    //     if (Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto)
    //     } else{
    //         return this.tasksService.getAllTasks()
    //     }
    // }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto, user)
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // // createTask(@Body() body){ // veya (@Body("title") title: string)gibi
    //     // nestJS provide us 2 way to supply input both of them use @Body decorator
    //     // 1st option is entire full body and second one is retrieve titled item in body
        
    // // createTask(
    //     // @Body("title") title: string,
    //     // @Body("description") description: string bunlar yerin artik DTO larimiz var
    //     createTask(@Body() createTaskDto : createTaskDto): Task{
    //     return this.tasksService.createTask(createTaskDto)
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : createTaskDto,
     @GetUser() user: User //her taskin hangi usera ait oldugu kaydi icin type
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user)
    }

    // @Get('/:id') //burda / yazmamiz cok onemli degil
    // getTaskById(@Param('id') id : string): Task{
    //     return this.tasksService.getTaskById(id)
    // }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id : number, @GetUser() user: User): Promise<Task>{
        return this.tasksService.getTaskById(id, user)
    }

    // @Delete("/:id")
    // deleteTask(@Param("id") id: string): void{
    //     return this.tasksService.deleteTask(id)
    // }

    @Delete("/:id")
    deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTask(id)
    }

    // @Patch("/:id/status")
    // updateTaskStatus(
    //     @Param("id") id: string,
    //     @Body("status", TaskStatusValidationPipe) status: TaskStatus
    // ): Task{ 
    //     return this.tasksService.updateTaskStatus(id, status)
    // }

    @Patch("/:id/status")
    updateTaskStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task>{ 
        return this.tasksService.updateTaskStatus(id, status, user)
    }

    //  DB  connection yaptiktan sonra comment ettik 
}
