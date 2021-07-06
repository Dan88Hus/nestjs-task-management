import { IsNotEmpty } from "class-validator"


export class createTaskDto {
    // what kind of data we expect
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

}