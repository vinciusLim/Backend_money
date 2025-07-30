// src/modules/transaction/transaction.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service'; // CAMINHO DO PROFESSOR CONFIRMADO
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data: data ? new Date(data) : undefined, // Mapeia 'data' do DTO para 'data' do Prisma (Date)
        price,
        type,
      },
    });
    return createdTransaction;
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return transaction; // Retorna a transação ou null/undefined
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      // Prepara os dados para atualização, garantindo que 'data' seja Date se existir
      const dataToUpdate: {
        title?: string;
        price?: number;
        category?: string;
        data?: Date; // O campo é 'data' (Date) no Prisma
        type?: TransactionType;
      } = {};

      if (updateTransactionDto.title !== undefined) dataToUpdate.title = updateTransactionDto.title;
      if (updateTransactionDto.price !== undefined) dataToUpdate.price = updateTransactionDto.price;
      if (updateTransactionDto.category !== undefined) dataToUpdate.category = updateTransactionDto.category;
      // Converte 'data' de string (DTO) para Date (Prisma) se estiver presente
      if (updateTransactionDto.data !== undefined) dataToUpdate.data = new Date(updateTransactionDto.data);
      if (updateTransactionDto.type !== undefined) dataToUpdate.type = updateTransactionDto.type;

      const updatedTransaction = await this.prisma.transaction.update({
        where: { id },
        data: dataToUpdate,
      });
      return updatedTransaction;
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.transaction.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }
}
