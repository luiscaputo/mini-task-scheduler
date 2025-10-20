import { Task } from "../../../entities";

export interface CreateTaskInput
  extends Omit<Task, "id" | "createdAt" | "updatedAt"> {}
export interface CreateTaskOutput extends Task {}
