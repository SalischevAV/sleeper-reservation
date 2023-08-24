import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '@app/common';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
