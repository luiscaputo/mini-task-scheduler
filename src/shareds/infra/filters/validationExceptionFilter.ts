import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let errors = null;

    if (
      typeof exceptionResponse === "object" &&
      "message" in exceptionResponse
    ) {
      errors = Array.isArray(exceptionResponse["message"])
        ? exceptionResponse["message"]
        : [exceptionResponse["message"]];
    }

    response.status(status).json({
      statusCode: status,
      message: "Validation error occurred.",
      errors,
    });
  }
}
