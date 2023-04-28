import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { IsOptional } from 'class-validator';

export const hashValue = (input: string, salt = 10) => {
  return hashSync(input, genSaltSync(salt));
};

export const compareHash = (password: string, hashPassword: string) => {
  return compareSync(password, hashPassword);
};

export enum Role {
  ADMIN,
  TEACHER,
  LEARNER,
}

export const PAGINATION = {
  take: 10,
  limit: 200,
  page: 1,
};

class PageOptions {
  page: number;
  take: number;

  constructor(take = PAGINATION.take, page = PAGINATION.page) {
    this.take = take;
    this.page = page;
  }

  get skip() {
    return this.take * (this.page - 1);
  }
}

export const getPagination = (page?: number, take?: number) => {
  return new PageOptions(page, take);
};

export class Pagination {
  @IsOptional()
  page: number;

  @IsOptional()
  take: number;
}
