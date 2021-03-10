import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entity/lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessionInput } from './dto/create-lession.input';
import { AssignStudentToLessonInput } from './dto/assign-student-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  private async saveLesson(lesson: Lesson) {
    try {
      return await this.lessonRepository.save(lesson);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createLesson(createLessionInput: CreateLessionInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessionInput;
    const lesson: Lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.saveLesson(lesson);
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

  async assignStudentToLesson(
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentToLessonInput;

    const lesson = await this.getLesson(lessonId);
    lesson.students = [...lesson.students, ...studentIds];

    return await this.saveLesson(lesson);
  }
}
