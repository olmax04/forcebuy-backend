import { ResourceWithOptions } from 'admin-bro';
import { Games } from '../../entities/games.entity';
const GamesResource: ResourceWithOptions = {
  resource: Games,
  options: {
    properties: {
      email: {
        isVisible: { edit: false, show: false, list: false, filter: false },
      },
    },
    actions: {
      list: {
        isVisible: ({ currentAdmin, records }) => {
          console.log(records);
          return currentAdmin && currentAdmin.role === 'admin';
        },
      },

      show: {
        isVisible: ({ currentAdmin, record }): boolean => {
          console.log(record.get('ownerId'));
          return (
            currentAdmin &&
            (currentAdmin.role === 'admin' ||
              currentAdmin.email === record.get('ownerId'))
          );
        },
      },
      edit: {
        isAccessible: ({ currentAdmin, record }) => {
          console.log(record.get('ownerId'));
          return (
            currentAdmin &&
            (currentAdmin.role === 'admin' ||
              currentAdmin.email === record.get('ownerId'))
          );
        },
      },
      delete: {
        isAccessible: ({ currentAdmin, record }) => {
          return (
            currentAdmin &&
            (currentAdmin.role === 'admin' ||
              currentAdmin.email === record.get('ownerId'))
          );
        },
      },
      new: {
        before: async (request, { currentAdmin }) => {
          request.payload = {
            ...request.payload,
            ownerId: currentAdmin._id,
          };
          return request;
        },
        isAccessible: ({ currentAdmin }) => {
          return currentAdmin && currentAdmin.role === 'admin';
        },
      },
    },
  },
};

export default GamesResource;
