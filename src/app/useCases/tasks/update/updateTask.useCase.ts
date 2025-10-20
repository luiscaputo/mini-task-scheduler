import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import {
  errorResponse,
  successResponse,
  HttpResponse,
  badRequestResponse,
} from "../../../../shareds/contracts/httpContracts";
import { TasksRepository } from "../../../repositories";
import { ErrorMessages } from "../../../../shareds/enums";
import { UpdateTaskInput, UpdateTaskOutput } from "./updateTaskInput";

@Injectable()
export class UpdateTaskUseCase implements IUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async execute(
    request: UpdateTaskInput,
  ): Promise<HttpResponse<UpdateTaskOutput>> {
    try {
      const task = await this.tasksRepository.findById(request.id);

      if (!task) {
        return badRequestResponse({ message: ErrorMessages.TASK_NOT_FOUND });
      }

      const taskUpdated = await this.tasksRepository.update(
        request.id,
        request,
      );

      return successResponse(taskUpdated as UpdateTaskOutput);
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
}
