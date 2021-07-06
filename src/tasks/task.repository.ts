import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task) // tells Repository for task entity
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto : createTaskDto): Promise<Task>{
        const { title, description } = createTaskDto
        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        await task.save()
        return task
    }
}