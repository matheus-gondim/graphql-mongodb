import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonModule } from './lesson/lesson.module';

// autoSchemaFile => define onde os schemas seram salvos, se true, eles seram salvos na memoria
// caso queira salvar em um diretorio específico o comando "join(process.cwd(), 'src/schema.gql')" deve ser passado e "import { join } from 'path';" deve ser importado

// sortSchema=> se true indexa os schemas em ordem alfabetica

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb://localhost:27018/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LessonModule,
  ],
})
export class AppModule {}
