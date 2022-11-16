import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { User } from "../schema/user.schema";
import { UserRegisterInput } from "../dto/userRegister.input";
import { UserService } from "../service/user.service";

@Resolver(() => User)
export class UserResolver {
    constructor (private readonly userService: UserService){}
    
    @Query(() => User, {name: 'bhuban'})
    user_signin(@Args('userInput') userInput: UserRegisterInput){
        let res = this.userService.user_register(userInput);
        return res;
    }

    @Mutation(() => User)
    user_register(@Args('registerUserInput') registerUserInput: UserRegisterInput){
        let res = this.userService.user_register(registerUserInput);
        return res;
    }
}