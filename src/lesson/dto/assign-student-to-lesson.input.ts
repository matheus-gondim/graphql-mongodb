import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentToLessonInput {
  @IsUUID()
  @Field(() => ID)
  lessonId: string;

  // each => verifica se é uma matriz e valida cada valor dela
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];
}
