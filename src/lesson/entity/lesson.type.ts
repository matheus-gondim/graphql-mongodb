import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
