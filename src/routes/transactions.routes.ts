import { Router } from 'express';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getRepository(Transaction);
  const transactionsRepository = new TransactionsRepository();
  const transactions = await transactionRepository.find();
  const balance = await transactionsRepository.getBalance(transactions);

  return response.json({
    transactions,
    balance,
  });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransactionService = new CreateTransactionService();

  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransactionService = new DeleteTransactionService();
  const deleted = await deleteTransactionService.execute(id);

  return response.json({ deleted });
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
