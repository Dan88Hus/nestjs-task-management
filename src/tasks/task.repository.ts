import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task) // tells Repository for task entity
export class TaskRepository extends Repository<Task>{
    
}