import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [] // because no DB yetm we store them in array

    getAllTasks(): Task[]{
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
        const { status, search } = filterDto
        let tasks = this.getAllTasks()

        if(status){
            tasks = tasks.filter(task=> task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return tasks
    }

    getTaskById(id: string): Task{
        return this.tasks.find(task=> task.id === id)
    }

    createTask(createTaskDto : createTaskDto): Task{
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    deleteTask(id): void {
         this.tasks = this.tasks.filter((task)=> task.id !== id)
    }

    updateTaskStatus(id:string, status: TaskStatus): Task{
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
}