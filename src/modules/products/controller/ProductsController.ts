import { Request, Response } from 'express';
import { CreateProducService } from '../services/CreateProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { ListProductsService } from '../services/ListProductsService';
import { ShowProductService } from '../services/ShowProductService';
import { UpdateProductService } from '../services/UpdateProductService';

class ProductsContoller {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute();

    return response.json({ products });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProducService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json({ product });
  }

  public async update(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletProduct = new DeleteProductService();

    await deletProduct.execute(id);

    return response.json([]);
  }
}

export { ProductsContoller };
