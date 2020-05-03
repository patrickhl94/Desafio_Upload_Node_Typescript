import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    category,
    type,
    title,
    value,
  }: Request): Promise<Transaction> {
    const transactionRepositories = new TransactionRepository();
    const createCategoryService = new CreateCategoryService();
    const transactionRepository = getRepository(Transaction);

    const categoryCreated = await createCategoryService.execute(category);

    const { id: category_id } = categoryCreated;

    const transactions = await transactionRepository.find();

    const { total } = await transactionRepositories.getBalance(transactions);
    console.log(total);
    if (type === 'outcome' && value > total) {
      throw new AppError('The value is less than the total available');
    }

    const transaction = transactionRepository.create({
      category_id,
      type,
      title,
      value,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
