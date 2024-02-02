import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './controllers/items/items.module';
import { UsersModule } from './controllers/users/users.module';
import { BookmarksModule } from './controllers/bookmarks/bookmarks.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/catch'),
    ItemsModule,
    UsersModule,
    BookmarksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
