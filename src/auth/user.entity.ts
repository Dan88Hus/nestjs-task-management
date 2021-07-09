import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import * as bcrypt from 'bcrypt'
import { Task } from "../tasks/task.entity"

@Entity()
@Unique(["username"]) //this prevents duplicate username that we specified in array as column name

export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string
    @OneToMany(type => Task, task => task.user,{ eager: true }) //inverSide how could we access that user own the task
    tasks: Task[] // to retrieve the user task that user owns OneToMany
    // bunun birde task entitiy de manywone yapilacak 

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}