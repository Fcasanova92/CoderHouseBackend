import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { UserMock } from '../models/user.mock';

export const userFactory = (number = 50) => {
  const users = [];

  for (let i = 0; i < number; i++) {
    const mockUser = new UserMock({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(faker.internet.password({ length: 10 }), 10), // password encriptada
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    });

    users.push(mockUser);
  }
  return users;
};