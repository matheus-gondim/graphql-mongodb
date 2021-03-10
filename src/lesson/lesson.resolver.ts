import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Lesson } from './entity/lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  createLession(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(name, startDate, endDate);
  }
}
