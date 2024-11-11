import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponse } from 'src/users/dtos/response/user-response.dto';

const getCurrentUserByContext = (context: ExecutionContext): UserResponse => {
  console.log('current usesr===');
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
