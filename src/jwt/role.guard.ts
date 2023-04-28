import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from '../core/decorator';
import { Role } from '../utils';
@Injectable()
export class JwtRolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()]);

    if (roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as Auth;
    if (roles.includes(user.role)) return true;
    return false;
  }
}
