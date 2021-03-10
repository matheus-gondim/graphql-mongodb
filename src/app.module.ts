import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './lesson/lesson.module';

// autoSchemaFile => define onde os schemas seram salvos, se true, eles seram salvos na memoria
// caso queira salvar em um diretorio específico o comando "join(process.cwd(), 'src/schema.gql')" deve ser passado e "import { join } from 'path';" deve ser importado
import { StudentModule } from './student/student.module';

// sortSchema=> se true indexa os schemas em ordem alfabetica

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
