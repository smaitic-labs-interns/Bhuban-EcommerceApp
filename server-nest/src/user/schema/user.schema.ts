import { ObjectType, Field } from "@nestjs/graphql";
import { Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    @Field(() => String, {description: 'User First name'})
    firstName: String;
    
    @Prop()
    @Field(() => String, {description: 'User Middle name'})
    middleName: String;
    
     @Prop()
    @Field(() => String, {description: 'User Last name'})
    lastName: String;
    
     @Prop()
    @Field(() => String, {description: 'User Full Address'})
    adddress: String;
    
     @Prop()
    @Field(() => String, {description: 'User login email'})
    email: String;
    
    @Prop()
    @Field(() => String, {description: 'User login Password'})
    password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);