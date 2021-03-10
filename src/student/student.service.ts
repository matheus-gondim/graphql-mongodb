import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entity/student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStudent(id: string): Promise<Student> {
    try {
      return await this.studentRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
