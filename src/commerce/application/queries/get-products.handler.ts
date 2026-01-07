import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product.entity';
import { GetProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(query: GetProductsQuery): Promise<Product[]> {
        return this.productRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
}
