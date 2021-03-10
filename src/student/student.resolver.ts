import { Resolver } from '@nestjs/graphql';
import { StudentType } from './entity/student.type';
import { StudentService } from './student.service';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
}
