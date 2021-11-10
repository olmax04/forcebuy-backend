import { INestApplication } from '@nestjs/common';
import { Database, Resource } from 'admin-bro-typeorm';
import AdminBro from 'admin-bro';

import * as AdminBroExpress from 'admin-bro-expressjs';
import UserResource from './resourses/user.resource';
import { User } from '../entities/user.entity';
import GamesResource from './resourses/games.resource';

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  /**
   * Register TypeORM adapter for using
   */
  AdminBro.registerAdapter({ Database, Resource });

  const adminBro = new AdminBro({
    resources: [UserResource, GamesResource],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (user.encryptedPassword === password) {
        return user;
      }
      return false;
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  });
  app.use(adminBro.options.rootPath, router);
}
