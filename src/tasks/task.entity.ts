import { User } from "../auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
// import { TaskStatus } from "./tasks.model"; DB will be used

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    // status: TaskStatus
    status: TaskStatus

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User
    //there could be many task for user
    // where user could be tasks, explain 2nd arg 
    // eager burda false iken user.entity de true
    //true iken we can acccet nested array immediately iki tarafta true olmayacak
    

    //even userId is auto generated by postgresql, we still need to identify to typeorm
    // under the defined relationship
    @Column()
    userId: number

}