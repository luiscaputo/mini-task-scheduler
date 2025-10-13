import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";
import { ValidationExceptionFilter } from "./shareds/infra/filters/validationExceptionFilter";

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory(errors) {
        return new BadRequestException(
          errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        );
      },
      enableDebugMessages: true,
    }),
  );
  app.useGlobalFilters(new ValidationExceptionFilter());
}
