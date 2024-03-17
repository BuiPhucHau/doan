
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema ({timestamps: true})
export class User {
    @Prop({required: true, unique: true})
    uid: string;
    @Prop({required: true})
    email; string;
    @Prop({required: true})
    password: string;
    @Prop({required: true})
    name: string;
    @Prop({})
    avatar: string;
    @Prop({required: true})
    phone: string;
    @Prop({})
    address: string;
    @Prop({})
    role: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);