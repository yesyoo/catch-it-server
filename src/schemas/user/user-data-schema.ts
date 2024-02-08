import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { IUserData } from 'src/interfaces/user';

@Schema()
export class User_data implements IUserData {

    @Prop() username: string

    @Prop() city: string

    @Prop() district: string

    @Prop() description: string

    @Prop() img: string

    @Prop() user: string

}

export const UserDataSchema = SchemaFactory.createForClass(User_data);
export type UserDataDocument = HydratedDocument<User_data>;