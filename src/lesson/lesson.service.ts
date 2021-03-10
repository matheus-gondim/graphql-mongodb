import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entity/lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessionInput } from './dto/create-lession.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessionInput: CreateLessionInput): Promise<Lesson> {
    const { name, startDate, endDate } = createLessionInput;
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

  async getlessons(): Promise<Lesson[]> {
    try {
      return await this.lessonRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
