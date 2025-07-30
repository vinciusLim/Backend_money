
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Res() res: Response,
  ) {
    const createdTransaction =
      await this.transactionService.create(createTransactionDto);
    res.status(HttpStatus.CREATED).send(createdTransaction);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionService.findOne(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }
    return transaction;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const updatedTransaction = await this.transactionService.update(id, updateTransactionDto);
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }
    return updatedTransaction;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const removedSuccessfully = await this.transactionService.remove(id);
    if (!removedSuccessfully) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
