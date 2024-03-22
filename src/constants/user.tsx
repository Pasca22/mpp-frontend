import { getAllUsers } from "@/service/user_service";
// import { faker } from "@faker-js/faker";

export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar: string;
  ip: string;
};

// var id_count = 0;

// function createRandomUser(): User {
//   id_count++;
//   return {
//     id: id_count,
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     ip: faker.internet.ipv4(),
//   };
// }

// export var USERS: User[] = faker.helpers.multiple(createRandomUser, {
//   count: 6,
// });

export var USERS: User[] = await getAllUsers();
