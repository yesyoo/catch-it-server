import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { IUser } from 'src/interfaces/user';
import { Role } from 'src/types';

@Schema()
export class User implements IUser {

    @Prop() email: string

    @Prop() password: string

    @Prop() role: Role

};

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;