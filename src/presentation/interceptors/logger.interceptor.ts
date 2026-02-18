import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { IS_LOGGER_METHOD } from '../decorators/logger.decorator';
import { Request } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldLog =
      this.reflector.getAllAndOverride<boolean>(IS_LOGGER_METHOD, [
        context.getHandler(),
        context.getClass(),
      ]) ?? true;

    if (!shouldLog) return next.handle();

    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const subject = request['subject'] ?? 'anonymous';
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        console.log(
          `[${method}] ${url} - ${delay}ms | ${new Date().toISOString()} | Subject: ${subject}`,
        );
      }),
    );
  }
}
