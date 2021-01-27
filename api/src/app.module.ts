import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ApiController } from './api.controller';
import { AppService } from './app.service';
import { ApiService } from './api.service';
import { NHTSAService } from './services/nhtsa/nhtsa.service';

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/carvin?authSource=admin&retryWrites=true&w=majority&readPreference=primary&ssl=false`;

console.log(`Connecting to ${mongoUrl}`);

@Module({
  // the list of imported modules that export the providers which are required in this module
  imports: [
    HttpModule,
    MongooseModule.forRoot(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      dbName: 'carvin'
    })
  ],
  // the set of controllers defined in this module which have to be instantiated
  controllers: [
    AppController,
    ApiController
  ],
  // the providers that will be instantiated by the Nest injector and that may
  // be shared at least across this module
  providers: [
    AppService,
    ApiService,
    NHTSAService
  ]
  // the subset of providers that are provided by this module and should be
  // available in other modules which import this module
  // exports: []
})
export class AppModule {
}
