import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user';
import { compareHash, getPagination, hashValue, Pagination } from '../../utils';
import { UserCreateDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private readonly userRepo: Model<UserDocument>, private jwtService: JwtService) {}

  async create(dto: UserCreateDto) {
    this.logger.log(`Create new user: ${JSON.stringify(dto)}`);

    const { password, ...data } = dto;
    const hashPassword = hashValue(password);

    const newUser = await new this.userRepo({ ...data, password: hashPassword }).save();
    return { id: newUser.id };
  }

  async validateUser(dto: UserCreateDto) {
    this.logger.log(`Validate user: ${JSON.stringify(dto)}`);

    const user = await this.userRepo
      .findOne({ username: dto.username })
      .select({ username: 1, password: 1, _id: 1, role: 1 })
      .lean();

    if (user) {
      const { password, ...data } = user;

      if (compareHash(dto.password, password)) {
        const expiresIn = Number(process.env.JWT_EXPIRATION) + `m`;
        const payload = { id: data._id, role: data.role };
        const accessToken = this.jwtService.sign(payload);

        return { id: data._id, accessToken: accessToken, expiresIn };
      }
    }

    return null;
  }

  async getAllUsers(input: Pagination, keyword: string) {
    this.logger.log(`Get all users`);

    const { skip, take, page } = getPagination(input.take, input.page);

    const where: FilterQuery<unknown> = { username: { $regex: keyword, $options: 'i' } };
    const [count, user] = await Promise.all([
      this.userRepo.find(where).count(),
      this.userRepo.find(where).skip(skip).limit(take).lean(),
    ]);

    return { count, page, user };
  }
}
