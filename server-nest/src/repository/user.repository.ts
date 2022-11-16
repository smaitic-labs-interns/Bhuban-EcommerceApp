import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { Model, FilterQuery } from "mongoose";
import { UserRegisterInput } from "src/user/dto/userRegister.input";


@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

    async add_user(user: UserRegisterInput): Promise<User>{
        const newuser = new this.userModel(user);
        return newuser.save();
    }
}
