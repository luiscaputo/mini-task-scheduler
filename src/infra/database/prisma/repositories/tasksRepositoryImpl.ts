import { Injectable } from "@nestjs/common";
import {
  TasksRepository,
  ISearchAndFilterTasks,
} from "../../../../app/repositories";
import { PrismaService } from "../prismaService";
import { Task } from "@prisma/client";
import { Task as TasksEntity } from "../../../../app/entities";

@Injectable()
export class TasksRepositoryImpl implements TasksRepository {
  constructor(private readonly _prisma: PrismaService) {}
  async create(input: TasksEntity): Promise<Task> {
    return this._prisma.task.create({
      data: {
        id: input.id,
        title: input.title,
        description: input.description,
        status: input.status,
        dueDate: input.dueDate,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        ownerId: input.ownerId,
        priority: input.priority,
      },
    });
  }
  findById(id: string): Promise<Task | null> {
    return this._prisma.task.findUnique({ where: { id } });
  }
  async findAll(input?: ISearchAndFilterTasks): Promise<Task[]> {
    const {
      ownerId,
      status,
      priority,
      dueDateFrom,
      dueDateTo,
      page = 1,
      limit = 10,
      order = "desc",
    } = input || {};

    return this._prisma.task.findMany({
      where: {
        ownerId,
        status,
        priority,
        dueDate: {
          gte: dueDateFrom,
          lte: dueDateTo,
        },
      },
      orderBy: {
        createdAt: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async update(id: string, task: TasksEntity): Promise<Task> {
    return this._prisma.task.update({
      where: { id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        updatedAt: task.updatedAt,
        priority: task.priority,
        ownerId: task.ownerId,
      },
    });
  }
  async delete(id: string): Promise<void> {
    this._prisma.task.delete({ where: { id } });
  }
}
