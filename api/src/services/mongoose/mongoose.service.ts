import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import mongodb from 'mongodb';

@Injectable()
export class MongooseService {
  constructor(@InjectConnection() private conn: Connection) {}

  get connection(): Connection {
    return this.conn;
  }

  get nativeClient(): mongodb.MongoClient {
    return this.conn.getClient();
  }
}
