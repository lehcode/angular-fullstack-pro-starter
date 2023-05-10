import { Module } from '@nestjs/common';
import { UsersService} from '@services/users/users.service';
import { BaseModule } from '@base/base.module';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from '@db/db.module';
import { ApiModule } from '@api/api.module';

@Module({
  imports: [
    BaseModule,
    DbModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}
