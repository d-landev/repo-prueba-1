import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand, CreateProductDto } from '../application/commands/create-product.command';
import { GetProductsQuery } from '../application/queries/get-products.query';

@Controller('products')
export class ProductController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    async create(@Body() dto: CreateProductDto) {
        const { name, description, price, stock } = dto;
        const command = new CreateProductCommand(name, description, price, stock);
        const id = await this.commandBus.execute(command);
        return { id };
    }

    @Get()
    async findAll() {
        return this.queryBus.execute(new GetProductsQuery());
    }
}
