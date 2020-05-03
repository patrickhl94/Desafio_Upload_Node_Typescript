import { getRepository } from 'typeorm';

import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getRepository(Category);
    let category = await categoryRepository.findOne({ where: { title } });
    if (category) {
      return category;
    }

    category = categoryRepository.create({ title });
    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
