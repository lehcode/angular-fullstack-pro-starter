import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '@services/users/users.service';
import {UserInterface} from '@interfaces/user/user.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(username: string, pass: string): Promise<UserInterface | undefined> {
    const user = await this.userService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here instead of the user object
    return user;
  }
}
