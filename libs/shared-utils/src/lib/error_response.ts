import { RpcException } from '@nestjs/microservices';

export const errorResponse = (code: number, error: string): RpcException => {
  const message = { status: code, message: error };
  throw new RpcException(JSON.stringify(message));
};
