import { InputType, Field } from "@nestjs/graphql";


@InputType()
export class UserRegisterInput{
    @Field(() => String, {description: 'User First Name'})
    firstName: String;
    
    @Field(() => String, {description: 'User Middle name'})
    middleName: String;
    
    @Field(() => String, {description: 'User Last name'})
    lastName: String;
    
    @Field(() => String, {description: 'User Full Address'})
    adddress: String;
    
    @Field(() => String, {description: 'User login email'})
    email: String;
    
    @Field(() => String, {description: 'User login Password'})
    password: String;

}
