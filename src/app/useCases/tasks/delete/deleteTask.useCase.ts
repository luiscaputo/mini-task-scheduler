import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import {
  errorResponse,
  HttpResponse,
  badRequestResponse,
} from "../../../../shareds/contracts/httpContracts";
import { TasksRepository } from "../../../repositories";
import { ErrorMessages } from "../../../../shareds/enums";

@Injectable()
export class DeleteTaskUseCase implements IUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async execute(request: string): Promise<HttpResponse<void>> {
    try {
      const task = await this.tasksRepository.findById(request);

      if (!task) {
        return badRequestResponse({ message: ErrorMessages.TASK_NOT_FOUND });
      }
      await this.tasksRepository.delete(request);
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
}
