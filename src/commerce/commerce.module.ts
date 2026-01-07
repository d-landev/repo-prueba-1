import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/product.entity';
import { CreateProductHandler } from './application/commands/create-product.handler';
import { GetProductsHandler } from './application/queries/get-products.handler';
import { ProductController } from './presentation/product.controller';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [ProductController],
    providers: [CreateProductHandler, GetProductsHandler],
})
export class CommerceModule { }
