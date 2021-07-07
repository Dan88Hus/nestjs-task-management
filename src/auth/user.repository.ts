import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User) //this UserRepository interactcs with user DB
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto
        const user = new User() //this is new entity we create
        user.username = username
        user.password = password 
        await user.save()
        //if we not return anything its void type as well
        
    }
}