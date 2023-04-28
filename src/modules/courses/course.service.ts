import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../../core/decorator';
import { Course, CourseDocument } from '../../schemas/course';
import { User, UserDocument } from '../../schemas/user';
import { getPagination, Pagination } from '../../utils';
import { CourseDto, CourseUpdateDto } from './dto';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(
    @InjectModel(Course.name) private readonly courseRepo: Model<CourseDocument>,
    @InjectModel(User.name) private readonly userRepo: Model<UserDocument>,
  ) {}

  async getAllCourses(input: Pagination) {
    this.logger.log('Get all courses');

    const { page, take, skip } = getPagination(input.page, input.take);

    const [count, data] = await Promise.all([
      this.courseRepo.find({}).count(),
      this.courseRepo
        .find(
          {},
          {
            _id: true,
            name: true,
            cost: true,
            description: true,
            image: true,
            created_at: true,
            user: { _id: true, avatar: true, name: true },
          },
        )
        .skip(skip)
        .limit(take)
        .lean(),
    ]);

    return { count, page, data };
  }

  async createNewCourse(dto: CourseDto, auth: Auth) {
    this.logger.log(`Create new course: ${JSON.stringify(dto)}`);

    const { id } = auth;
    const user = await this.userRepo.findOne({ _id: id });

    const newCourse = await new this.courseRepo({ ...dto, user }).save();

    return { id: newCourse._id };
  }

  async updateCourse(_id: string, dto: CourseUpdateDto) {
    this.logger.log(`Update course: ${JSON.stringify(dto)}`);

    const isExistCourse = await this.isExistCourse(_id);
    if (!isExistCourse) throw new BadRequestException(`Course is not exist`);

    const output = await this.courseRepo.updateOne({ _id }, dto, { new: true });
    return output;
  }

  async deleteCourse(_id: string) {
    this.logger.log(`Delete course: ${_id}`);

    const isExistCourse = await this.isExistCourse(_id);
    if (!isExistCourse) throw new BadRequestException(`Course is not exist`);

    const output = await this.courseRepo.findByIdAndDelete({ _id });
    return output;
  }

  async isExistCourse(_id: string) {
    const isExistCourse = await this.courseRepo.find({ _id });
    return Boolean(isExistCourse);
  }
}
