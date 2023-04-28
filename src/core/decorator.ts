import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Role } from '../utils';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export type Auth = { id: string; role: Role };

export const getAuth = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = context.switchToHttp().getRequest();
  return ctx.user as Auth;
});
