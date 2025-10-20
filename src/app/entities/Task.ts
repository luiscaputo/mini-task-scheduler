import { UuidGenerator } from "../../shareds/helpers/UuidGenerator";
import { Replace } from "../../shareds/helpers/replace";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "inprogress" | "done" | "delayed";

interface ITaskProps {
  title: string;
  description?: string;
  ownerId: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private readonly _id: string;
  private props: ITaskProps;

  constructor(
    props: Replace<ITaskProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? UuidGenerator.generate();
    this.props = {
      ...props,
      title: props.title.trim(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    if (!title.trim()) throw new Error("Task title cannot be empty.");
    this.props.title = title.trim();
    this.touch();
  }

  get description(): string | undefined {
    return this.props.description;
  }

  set description(desc: string | undefined) {
    this.props.description = desc?.trim();
    this.touch();
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  get dueDate(): Date | undefined {
    return this.props.dueDate;
  }

  set dueDate(date: Date | undefined) {
    if (date && date < new Date()) {
      throw new Error("Due date cannot be in the past.");
    }
    this.props.dueDate = date;
    this.touch();
  }

  get priority(): TaskPriority {
    return this.props.priority;
  }

  set priority(priority: TaskPriority) {
    this.props.priority = priority;
    this.touch();
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  set status(status: TaskStatus) {
    this.props.status = status;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public markAsDone(): void {
    if (this.props.status === "done") return;
    this.props.status = "done";
    this.touch();
  }

  public markAsInProgress(): void {
    if (this.props.status === "inprogress") return;
    this.props.status = "inprogress";
    this.touch();
  }

  public isOverdue(): boolean {
    return (
      !!this.props.dueDate &&
      this.props.dueDate < new Date() &&
      this.props.status !== "done"
    );
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private validate(): void {
    if (!this.props.title.trim())
      throw new Error("Task must have a valid title.");
    if (!this.props.ownerId) throw new Error("Task must have an ownerId.");
  }

  toJSON() {
    return {
      id: this._id,
      ...this.props,
    };
  }
}
