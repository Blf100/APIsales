import { AppError } from '@shared/errors/App.Error';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export { ShowProductService };
