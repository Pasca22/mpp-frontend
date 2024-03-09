import { faker } from "@faker-js/faker";

type User = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  ip: string;
  dog_name: string;
};

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

export var USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 4,
});
