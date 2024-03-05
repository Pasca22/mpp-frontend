import { faker } from "@faker-js/faker";

interface User {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  ip: string;
  dog_name: string;
}

function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    ip: faker.internet.ipv4(),
    dog_name: faker.animal.dog(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 6,
});
