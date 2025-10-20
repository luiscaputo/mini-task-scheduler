import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import { TasksRepository, UsersRepository } from "../../../repositories";
import {
  badRequestResponse,
  errorResponse,
  HttpResponse,
  successResponse,
} from "../../../../shareds/contracts/httpContracts";
import { ErrorMessages, TaskStatus } from "../../../../shareds/enums";
import { CreateTaskInput, CreateTaskOutput } from "./createTaskInput";
import { Task } from "../../../entities";

@Injectable()
export class CreateTaskUseCase implements IUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async execute(
    request: CreateTaskInput,
  ): Promise<HttpResponse<CreateTaskOutput>> {
    try {
      const user = await this.usersRepository.findById(request.ownerId);
      if (!user) {
        return badRequestResponse({ message: ErrorMessages.USER_NOT_FOUND });
      }

      if (request.dueDate < new Date()) {
        return badRequestResponse({ message: ErrorMessages.INVALID_DUE_DATE });
      }

      const task = new Task({
        title: request.title,
        description: request.description,
        ownerId: user.id,
        dueDate: request.dueDate,
        priority: request.priority,
        status: TaskStatus.todo,
      });

      await this.tasksRepository.create(task);
      return successResponse(task as CreateTaskOutput);
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
}
