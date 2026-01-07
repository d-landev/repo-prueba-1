import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product.entity';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async execute(command: CreateProductCommand): Promise<string> {
        const { name, description, price, stock } = command;

        // Ideally use a Factory or static method on Entity
        const product = this.productRepository.create({
            name,
            description,
            price,
            stock,
        });

        await this.productRepository.save(product);
        return product.id;
    }
}
