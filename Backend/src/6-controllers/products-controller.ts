import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../5-logic/products-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from '../3-middleware/verify-admin';
import cyber from "../2-utils/cyber";
import ProductModel from "../4-models/product-models/product-model";
import { log } from "console";
import ordersLogic from "../5-logic/orders-logic";

const router = express.Router();

router.get('/categories', async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const categories = await productsLogic.getCategories();        
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/random_products', async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await productsLogic.getRandomProducts((+req.query.start | 0), (+req.query.limit | 11));        
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/search_products/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await productsLogic.getProductsByName(req.params.name, (+req.query.start | 0), (+req.query.limit | 11));        
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/products_by_category/:categoryID([0-9]+)', async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const categoryID = +req.params.categoryID;
        const products = await productsLogic.getProductsByCategory(categoryID, (+req.query.start | 0), (+req.query.limit | 11));        
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/orders_and_products_amount', async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const amounts = [await productsLogic.getProductsAmount(), await ordersLogic.getOrdersAmount()];     
        res.send(amounts);
    } catch (error) {
        next(error);
    }
});

router.post('/add_product', verifyAdmin, async (req: Request, res: Response, next: NextFunction)=>{
    try {
        req.body.image = req.files?.image;
        const product = new ProductModel(req.body);

        const newProduct = await productsLogic.addProduct(product);

        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/delete_product/:productID([0-9]+)', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productsLogic.deleteProduct(+req.params.productID);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

router.put('/update_product', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.image = req.files?.image;
        const product = new ProductModel(req.body);
        
        const newProduct = await productsLogic.updateProduct(product);
        
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }

})

export default router;