import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../../schemas/course';
import { Lesson, LessonDocument } from '../../schemas/lesson';
import { getPagination, Pagination } from '../../utils';

@Injectable()
export class LessonService {
  private readonly logger = new Logger(LessonService.name);

  constructor(
    @InjectModel(Lesson.name) private readonly lessonRepo: Model<LessonDocument>,
    @InjectModel(Course.name) private readonly courseRepo: Model<CourseDocument>,
  ) {}

  async getAllLessonsByCourse(idCourse: string, input: Pagination) {
    this.logger.log(`Get all lessons by course: ${idCourse}`);

    const { page, take, skip } = getPagination(input.page, input.take);
    const [count, data] = await Promise.all([
      this.lessonRepo.find({ course: { _id: idCourse } }).count(),
      this.lessonRepo
        .find(
          { course: { _id: idCourse } },
          { _id: true, name: true, description: true, video_url: true, created_at: true },
        )
        .skip(skip)
        .limit(take)
        .lean(),
    ]);

    return { count, page, data };
  }

  async getAllLessons(input: Pagination) {
    this.logger.log(`Get all lessons`);

    const { page, take, skip } = getPagination(input.page, input.take);
    const [count, data] = await Promise.all([
      this.lessonRepo.find({}).count(),
      this.lessonRepo
        .find({}, { _id: true, name: true, description: true, video_url: true, created_at: true })
        .skip(skip)
        .limit(take)
        .lean(),
    ]);

    return { count, page, data };
  }
}
