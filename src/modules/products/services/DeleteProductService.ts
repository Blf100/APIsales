import { AppError } from '@shared/errors/App.Error';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({
      where: id,
    });

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productRepository.remove(product);
  }
}

export { DeleteProductService };
