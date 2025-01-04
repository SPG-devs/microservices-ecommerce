import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        // Log the error for debugging purposes
        console.error('Error intercepted:', error);

        // Check if it's a specific error or just a general one
        // if (error instanceof RpcException) {
        //   return throwError(() => error); // Re-throw the RpcException
        // }

        // // For unknown or generic errors
        // const errorMessage = error?.message || 'Unknown error occurred';

        // // Customize the error message and structure as needed
        // const errorResponse = {
        //   message: errorMessage,
        //   statusCode: error?.status || 500, // Default to 500 for unhandled errors
        // };

        // You could add more detailed error info if necessary
        return throwError(() => error);
      })
    );
  }
}
