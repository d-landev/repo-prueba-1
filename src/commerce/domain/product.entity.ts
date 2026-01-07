import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AppError } from '../../shared/errors/app.error';
import { AppErrorCodes } from '../../shared/errors/error-codes';
import { HttpStatus } from '@nestjs/common';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Domain Logic Methods
    public decreaseStock(quantity: number): void {
        if (this.stock < quantity) {
            throw new AppError(
                AppErrorCodes.INSUFFICIENT_STOCK,
                `Not enough stock for product ${this.name}. Available: ${this.stock}, Requested: ${quantity}`,
                HttpStatus.CONFLICT
            );
        }
        this.stock -= quantity;
    }
}
