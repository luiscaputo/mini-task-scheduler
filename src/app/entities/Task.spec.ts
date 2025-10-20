import { Task } from "./Task";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { TaskPriority, TaskStatus } from "../../shareds/enums/enums";

describe("Tasks", () => {
  const task = new Task({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    ownerId: randomUUID(),
    dueDate: faker.date.future(),
    priority: TaskPriority.medium,
    status: TaskStatus.todo,
    createdAt: new Date(),
  });
  it("should be able to create a task", () => {
    expect(task).toBeTruthy();
    expect(task).toHaveProperty("id");
    expect(task).toHaveProperty("title");
  });

  it("Should be validators is ok", () => {
    // expect(task.markAsDone()).toBe(TaskStatus.done);
  });
});
