import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateLessionInput } from './dto/create-lession.input';
import { Lesson } from './entity/lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './entity/lesson.type';
import { AssignStudentToLessonInput } from './dto/assign-student-to-lesson.input';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getlessons();
  }

  @Mutation(() => LessonType)
  createLession(
    @Args('createLessionInput') createLessionInput: CreateLessionInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessionInput);
  }

  @Mutation(() => LessonType)
  assignStudentToLessonInput(
    @Args('assignStudentToLessonInput')
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.assignStudentToLesson(assignStudentToLessonInput);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(lesson);
    const result = await this.studentService.getManyStudents(lesson.students);
    console.log(result);

    return result;
  }
}
