import { Injectable } from "@nestjs/common";
import {User} from '../schema/user.schema';
import { UserRegisterInput } from "../dto/userRegister.input";
import { UserRepository } from "src/repository/user.repository";



@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
    ){}

    async user_register(userRegisterInput: UserRegisterInput): Promise<User>{
        let res = await this.repository.add_user(userRegisterInput);
        return res;
    }
}