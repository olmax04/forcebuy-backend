import { ResourceWithOptions } from 'admin-bro';
import { User } from '../../entities/user.entity';

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
    },
    actions: {
      new: {
        before: async (request) => {
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: request.payload.password,
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
