import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../../../shareds/app/UseCase";
import {
  errorResponse,
  successResponse,
  HttpResponse,
} from "../../../../shareds/contracts/httpContracts";
import { TasksRepository } from "../../../repositories";
import { ListTasksOutput, SearchAndFilterTasksInput } from "./ListTaskInput";

@Injectable()
export class ListTasksUseCase implements IUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}
  async execute(
    request?: SearchAndFilterTasksInput,
  ): Promise<HttpResponse<ListTasksOutput[]>> {
    try {
      const tasks = await this.tasksRepository.findAll();
      return successResponse(
        tasks.length <= 0 ? [] : (tasks as ListTasksOutput[]),
      );
    } catch (error: any) {
      return errorResponse(error.message);
    }
  }
}
