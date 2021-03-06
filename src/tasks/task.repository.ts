import { User } from "../auth/user.entity"
import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { Logger } from "@nestjs/common";

@EntityRepository(Task) // tells Repository for task entity
export class TaskRepository extends Repository<Task>{
    private logger = new Logger("TaskRepository")

    async getTasks(filterDto: GetTasksFilterDto,
        user: User): Promise<Task[]>{
        const { status, search } = filterDto
        const query = this.createQueryBuilder("task")
        query.where("task.userId = :userId", {userId: user.id})

        if(status){
            query.andWhere("task.status = :status", { status})
        }
        if(search){
            query.andWhere("(task.title Like :search OR task.description LIKE :search)", 
            {search:`%${search}`})
        }
        try {
            const tasks = await query.getMany()
            return tasks
        } catch (error) {
            // console.log(error.stack)
            this.logger.error(`Failed to get task for user ${user.username}, Filters: ${JSON.stringify(filterDto)}`, error.stack)
            // 2nd argument can be error.stack
        }
    }
    
    async createTask(createTaskDto : createTaskDto, user: User): Promise<Task>{
        const { title, description } = createTaskDto
        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        task.user = user
        await task.save()
        delete task.user
        return task
    }
}