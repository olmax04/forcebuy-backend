import AdminBro, { ResourceWithOptions } from 'admin-bro';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    properties: {
      encryptedPassword: { isVisible: false },
      password: {
        type: 'string',
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
      role: {
        components: {
          edit: AdminBro.bundle('../components/dropdown'),
        },
      },
    },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
      },
      new: {
        before: async (request) => {
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(
                request.payload.password,
                10,
              ),
              password: undefined,
            };
          }
          return request;
        },
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
      },
      edit: {
        isAccessible: ({ currentAdmin }): boolean =>
          currentAdmin && currentAdmin.role === 'admin',
      },
      delete: {
        isAccessible: ({ currentAdmin }): boolean =>
          currentAdmin && currentAdmin.role === 'admin',
      },
    },
  },
};

export default UserResource;
