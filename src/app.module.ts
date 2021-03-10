import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

// autoSchemaFile => define onde os schemas seram salvos, se true, eles seram salvos na memoria
// caso queira salvar em um diretorio específico o comando "join(process.cwd(), 'src/schema.gql')" deve ser passado

// sortSchema=> se true indexa os schemas em ordem alfabetica

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
