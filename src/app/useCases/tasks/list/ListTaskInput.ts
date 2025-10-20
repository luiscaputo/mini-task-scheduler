import { Task } from "../../../entities";

export interface SearchAndFilterTasksInput {
  ownerId?: string;
  status?: string;
  priority?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
}

export interface ListTasksOutput extends Task {
  ownerId: string;
  name?: string;
}
