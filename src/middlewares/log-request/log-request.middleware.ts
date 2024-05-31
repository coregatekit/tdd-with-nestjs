import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `Request - ${method} ${originalUrl} ${statusCode} - ${userAgent}`,
      );
    });

    next();
  }
}
