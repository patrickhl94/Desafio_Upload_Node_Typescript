import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

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
    const createCategoryService = new CreateCategoryService();
    const transactionRepository = getRepository(Transaction);

    const categoryCreated = await createCategoryService.execute(category);

    const { id: category_id } = categoryCreated;

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
