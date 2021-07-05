import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [] // because no DB yetm we store them in array

    getAllTasks(): Task[]{
        return this.tasks
    }

    createTask(title: string, description: string): Task{
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }
}
