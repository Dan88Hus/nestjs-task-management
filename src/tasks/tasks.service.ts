import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
// import { Task, TaskStatus } from './tasks.model'; DB for it
// import { v1 as uuid } from 'uuid'; DB will be used for it
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    // private tasks: Task[] = [] // because no DB yetm we store them in array
    constructor(@InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){}
            //bundan sonra repository bize this.repository olarak ulasilabilinir
           
    // getAllTasks(): Task[]{
    //     return this.tasks
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
    //     const { status, search } = filterDto
    //     let tasks = this.getAllTasks()

    //     if(status){
    //         tasks = tasks.filter(task=> task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }
    //     return tasks
    // }

    // getTaskById(id: string): Task{
    //     const found = this.tasks.find(task=> task.id === id)
    //     if(!found){
    //         // throw new HttpException("Task in ID not FOund",HttpStatus.NOT_FOUND)
    //         throw new NotFoundException()

    //     }
    //     return found
    // }

    async getTasks(filterDto: GetTasksFilterDto,
        user: User): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto,user)
    }


    async getTaskById(id: number, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}})
        if(!found){
            throw new NotFoundException()
        }
        return found
    }

    // createTask(createTaskDto : createTaskDto): Task{
    //     const { title, description } = createTaskDto
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task)
    //     return task
    // }

        async createTask(createTaskDto : createTaskDto, user:User): Promise<Task>{
            return this.taskRepository.createTask(createTaskDto, user)
    }

    // deleteTask(id): void {
    //     const found = this.getTaskById(id)

    //      this.tasks = this.tasks.filter((task)=> task.id !== found.id)
    // }

    async deleteTask(id: number, user: User): Promise<void> {
         const result = await this.taskRepository.delete({id, userId: user.id}) // repository oldumu DB deki kolon adlari gecerli
         if(result.affected === 0){
             throw new NotFoundException(`Task ID ${id} not found `)
         }
    }


    // updateTaskStatus(id:string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }

    async updateTaskStatus(id:number, status: TaskStatus, user: User): Promise<Task>{
        const task = await this.getTaskById(id, user)
        task.status = status
        await task.save()
        return task
    }

    // DB connection dan sonra comment ettik ---------------------------

 

}
