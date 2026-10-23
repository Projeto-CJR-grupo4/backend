import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriasModule } from './categorias/categorias.module';
import { LojasModule } from './lojas/lojas.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [PrismaModule, CategoriasModule, LojasModule, ProdutosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
