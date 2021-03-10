import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './dto/create-student.input';
import { StudentType } from './entity/student.type';
import { StudentService } from './student.service';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return await this.studentService.createStudent(createStudentInput);
  }
}
