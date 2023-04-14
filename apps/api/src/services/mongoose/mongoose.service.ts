import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import mongodb from 'mongodb';
// eslint-disable-next-line
import { I18nTranslation, I18nTranslationDocument } from '@services/mongoose/schemas/i18n-translation.schema';

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
