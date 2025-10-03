import { HttpException, HttpStatus } from '@nestjs/common';

export function RmqErrorHandler() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        let parsed: any;
        try {
          parsed = JSON.parse(error.message);
        } catch {
          parsed = error;
        }
        throw new HttpException(
          parsed.message || 'Internal Server Error',
          parsed.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    };

    return descriptor;
  };
}
