import { ResourceWithOptions } from 'admin-bro';
import { User } from '../../entities/user.entity';

const UserResource: ResourceWithOptions = {
    resource: User,
    options: {},
};

export default UserResource;