import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Forcebuy Api!';
  }
  getUser(id: number) {
    return {
      id: id,
      name: 'olmax',
      password: 'password',
      email: 'email@mail.ru',
    };
  }
}
