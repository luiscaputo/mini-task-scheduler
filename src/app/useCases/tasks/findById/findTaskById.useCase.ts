import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import {
  errorResponse,
  successResponse,
  HttpResponse,
  badRequestResponse,
} from "../../../../shareds/contracts/httpContracts";
import { TasksRepository } from "../../../repositories";
import { Task } from "../../../entities";
import { ErrorMessages } from "../../../../shareds/enums";

@Injectable()
export class FindTaskByIdUseCase implements IUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async execute(request: string): Promise<HttpResponse<Task>> {
    try {
      const task = await this.tasksRepository.findById(request);

      if (!task) {
        return badRequestResponse({ message: ErrorMessages.TASK_NOT_FOUND });
      }
      return successResponse(task);
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
}
