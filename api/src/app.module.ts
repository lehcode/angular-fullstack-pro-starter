import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?authSource=admin&ssl=false`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        dbName: 'carvin',
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        family: 4,
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
