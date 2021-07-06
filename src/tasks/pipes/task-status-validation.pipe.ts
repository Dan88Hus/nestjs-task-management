import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

// export class TaskStatusValidationPipe implements PipeTransform{
export class TaskStatusValidationPipe implements PipeTransform{

    // transform(value: any, metadata:ArgumentMetadata){ //this takes 2 arguments, value, metadata
        // console.log("values and metadata", value , metadata) metadata key:value nin key inin verir
        // value ise key e ait olan degerler burda body den gelen
        readonly allowedStatuses = [
            TaskStatus.OPEN,
            TaskStatus.IN_PROGRESS,
            TaskStatus.DONE
        ]
        transform(value: any){ //this takes 2 arguments, value, metadata
            value = value.toUpperCase()
            if(!this.isStatusValid(value)){
                throw new BadRequestException(`${value} is an invalid statuses` )
            }
            return value
        }
        private isStatusValid(status: any){
            const idx = this.allowedStatuses.indexOf(status)
            return idx !== -1
        }
}