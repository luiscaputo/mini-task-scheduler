import { Password } from "../../shareds/helpers/Password";
import type { Replace } from "../../shareds/helpers/replace";
import { UuidGenerator } from "../../shareds/helpers/UuidGenerator";

interface IUserProps {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date | null;
}

export class User {
  private _id: string;
  private props: IUserProps;

  constructor(
    props: Replace<IUserProps, { createdAt: Date | null }>,
    id?: string,
  ) {
    this._id = id ?? UuidGenerator.generate();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set passwordHash(passwordHash: string) {
    this.props.passwordHash = Password.hashPassword(
      passwordHash,
    ) as unknown as string;
  }

  public get passwordHash(): string {
    return this.props.passwordHash;
  }

  public get createdAt(): Date | null {
    return this.props.createdAt;
  }
}
