import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@app/common';

const getCurrentUserByContext = (context: ExecutionContext): User =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
