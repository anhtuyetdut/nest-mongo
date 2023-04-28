import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Role } from '../utils';

export class RoleValidation implements PipeTransform {
  readonly allowedRole = [Role.ADMIN, Role.TEACHER, Role.LEARNER];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidRole) throw new BadRequestException(`${value} is not a valid role value`);
  }

  isValidRole(role) {
    return this.allowedRole.indexOf(role) > -1;
  }
}
