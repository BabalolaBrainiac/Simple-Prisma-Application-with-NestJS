import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    //switch error code and return error based on the code
    switch (exception.code) {
      case '404':
        const errorStatusCode = HttpStatus.NOT_FOUND;
        const message = exception.message.replace(
          /\n/g,
          'The resource you are looking for does not exist',
        );
        response.status(errorStatusCode).json({
          errorStatus: errorStatusCode,
          errorMessage: message,
        });
        break;

      case 'P001':
        const conflictStatusCode = HttpStatus.CONFLICT;
        const conflictMessage = exception.message.replace(
          /\n/g,
          'There is a conflict somewhere, please check your request and try again',
        );
        response.status(conflictStatusCode).json({
          errorStatus: conflictStatusCode,
          errorMessage: conflictMessage,
        });
        break;

      case 'P2001':
        const recordNotFoundCode = HttpStatus.NOT_FOUND;
        const recordNotFoundMessage = exception.message.replace(
          /\n/g,
          'The resource you are searching for cannot be found',
        );
        response.status(recordNotFoundCode).json({
          errorStatus: conflictStatusCode,
          errorMessage: recordNotFoundMessage,
        });
        break;

      default:
        super.catch(exception, host); // Falls back to Default Error Handler/Response if no status code was called  
    }
  }
}
