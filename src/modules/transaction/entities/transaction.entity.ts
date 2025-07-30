// src/modules/transaction/entities/transaction.entity.ts

export enum TransactionType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

export class Transaction {
  id: string;
  title: string;
  price: number;    // 'price'
  category: string; // 'category'
  data: Date;       // 'data' como um objeto Date
  createdAt: Date;
  updatedAt: Date;
  type: TransactionType;
}
