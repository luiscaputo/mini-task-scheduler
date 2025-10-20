import { Task } from "@prisma/client";
import { Task as TaskEntity } from "../entities";
import type { TaskPriority, TaskStatus } from "../../shareds/enums";

export interface ISearchAndFilterTasks {
  ownerId?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
}

export abstract class TasksRepository {
  abstract create(input: TaskEntity): Promise<Task>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(input?: ISearchAndFilterTasks): Promise<Task[]>;
  abstract update(id: string, task: TaskEntity): Promise<Task>;
  abstract delete(id: string): Promise<void>;
}
