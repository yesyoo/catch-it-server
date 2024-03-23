import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { IUserData } from 'src/interfaces/user';

@Schema()
export class Data_users implements IUserData {

    @Prop() username: string

    @Prop() city: string

    @Prop() district: string

    @Prop() description: string

    @Prop() img: string

    @Prop() user: string

}

export const DataUsersSchema = SchemaFactory.createForClass(Data_users);
export type DataUsersDocument = HydratedDocument<Data_users>;