
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IsEmail } from 'class-validator';

export type UserDocument =  HydratedDocument<User>;
@Schema ({timestamps: true})
export class User {
    @Prop({ required: true, unique: true })
    uid: string;
  
    @IsEmail()
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password: string;
  
    @Prop()
    name: string;
  
    @Prop()
    avatar: string;

    @Prop()
    phone: string;
  
    @Prop()
    address: string;
  }

export const UserSchema = SchemaFactory.createForClass(User);