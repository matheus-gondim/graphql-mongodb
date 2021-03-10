import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entity/lesson.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(
    name: string,
    startDate: string,
    endDate: string,
  ): Promise<Lesson> {
    const lesson: Lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    try {
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getLesson(id: string): Promise<Lesson> {
    try {
      return await this.lessonRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
