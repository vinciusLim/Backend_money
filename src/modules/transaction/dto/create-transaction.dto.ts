import { IsNumber, IsString, IsOptional, IsEnum, MinLength, IsDateString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;

  @IsNumber()
  price: number; // 'price'

  @IsString()
  category: string; // 'category'

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsDateString() // Para validar a string de data (ex: "2023-10-26T10:00:00Z")
  @IsOptional() // Opcional, pois o Prisma tem default(now()) para 'data'
  data?: string; // Usando 'data' como string inicialmente para validação
}
