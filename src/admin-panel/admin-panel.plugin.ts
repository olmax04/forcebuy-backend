import { INestApplication } from '@nestjs/common';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import * as bcrypt from 'bcryptjs';
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
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword);
        console.log('matched:', matched);
        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  });
  app.use(adminBro.options.rootPath, router);
}
