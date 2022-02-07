import { AppError } from '@shared/errors/App.Error';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('This product already exists');
    }

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export { UpdateProductService };
