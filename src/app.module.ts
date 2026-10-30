import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriasModule } from "./categorias/categorias.module";
import { LojasModule } from "./lojas/lojas.module";
import { ProdutosModule } from "./produtos/produtos.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { ProductRatingModule } from './product_rating/product_rating.module';
import { ProductRatingsModule } from './product_ratings/product_ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, 
    CategoriasModule, 
    LojasModule, 
    ProdutosModule,
    UserModule,
    AuthModule,
    ProductRatingModule,
    ProductRatingsModule,
  ],
  controllers: [AppController],
  providers: [
  AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
],
})
export class AppModule {}
