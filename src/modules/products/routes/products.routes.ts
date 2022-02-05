import { Router } from 'express';
import { ProductsContoller } from '../controller/ProductsController';

const productsRouter = Router();
const productController = new ProductsContoller();

productsRouter.get('/', productController.index);
productsRouter.get('/:id', productController.show);
productsRouter.post('/', productController.create);
productsRouter.put('/:id', productController.update);
productsRouter.delete('/id', productController.delete);

export { productsRouter };
