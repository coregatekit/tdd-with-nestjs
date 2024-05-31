import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Messages } from '../../utils/messages';
import { ErrorResponse } from '../responses.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(`An error occured on call ${request.url} - ${exception}`);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message;
    if (exception.message) {
      message = exception.response.message;
    } else {
      message =
        exception instanceof HttpException
          ? exception.message
          : Messages.CONTACT_SERIVCE;
    }

    const error: ErrorResponse = {
      statusCode: status,
      message,
      timestamp: new Date(),
      path: request.url,
    };

    response.status(status).json(error);
  }
}
