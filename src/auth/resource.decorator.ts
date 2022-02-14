import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';

export const Authorize = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return (x: string) => {
    if (x !== user.sub) throw new ForbiddenException();
  };
});
