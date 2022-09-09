import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (ctx: ExecutionContext, data?: string) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
