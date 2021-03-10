import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entity/student.entity';
import { StudentType } from './entity/student.type';
import { StudentService } from './student.service';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => StudentType)
  async student(@Args('id') id: string): Promise<Student> {
    return await this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async students(): Promise<Student[]> {
    return await this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return await this.studentService.createStudent(createStudentInput);
  }
}
