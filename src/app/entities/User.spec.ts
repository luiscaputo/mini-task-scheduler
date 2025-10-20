import { faker } from "@faker-js/faker";
import { User } from "./User";

describe("Users", () => {
  it("should be able to create a user", () => {
    const user = new User({
      name: faker.internet.domainName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      createdAt: new Date(),
    });
    expect(user).toBeTruthy();
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
  });
});
