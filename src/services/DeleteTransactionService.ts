import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<boolean> {
    const transactionRepository = getRepository(Transaction);

    const { affected } = await transactionRepository.delete({ id });

    if (!affected) {
      throw new AppError('Transaction not found with the given ID');
    }

    return true;
  }
}

export default DeleteTransactionService;
