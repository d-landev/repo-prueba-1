import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateProductCommand {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly stock: number,
    ) { }
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;
}
