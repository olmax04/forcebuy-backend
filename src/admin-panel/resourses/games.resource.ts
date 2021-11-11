import { ResourceWithOptions } from 'admin-bro';
import { Games } from '../../entities/games.entity';
const GamesResource: ResourceWithOptions = {
  resource: Games,
  options: {
    actions: {
      list: {
        before: async (request, { currentAdmin }) => {
          return {
            ...request,
            query: {
              ...request.query,
              'filters.owner': currentAdmin.email,
            },
          };
        },
      },
      new: {
        before: async (request, { currentAdmin }) => {
          request.payload = {
            ...request.payload,
            owner: currentAdmin.email,
          };
          return request;
        },
      },
    },
    properties: {
      owner: {
        isVisible: { filter: false, show: false, edit: false, list: false },
      },
      description: {
        type: 'richtext',
        props: {
          quill: {
            // some custom props
          },
        },
      },
    },
  },
};

export default GamesResource;
