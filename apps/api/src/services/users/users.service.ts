import { Injectable } from '@nestjs/common';
import { UserInterface } from '@interfaces/user/user.interface';

@Injectable()
export class UsersService {
  private readonly users: UserInterface[]= [
    {
      userId: 1,
      username: 'john',
      password: 'changeme'
    },
    {
      userId: 2,
      username: 'maria',
      password: 'changeme'
    }
  ];

  async findOne(username: string): Promise<UserInterface | undefined> {
    return this.users.find(user => user.username === username);
  }
}
