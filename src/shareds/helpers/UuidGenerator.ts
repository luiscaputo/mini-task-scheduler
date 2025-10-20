import { randomUUID } from "crypto";

export class UuidGenerator {
  static generate(): string {
    return randomUUID();
  }
}
