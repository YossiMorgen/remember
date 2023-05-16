import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import cardProductLogic from "../5-logic/card-products-logic";
import ProductCartModel from "../4-models/product-models/product_cart-model";
import cyber from "../2-utils/cyber";
import User from "../4-models/auth-models/user-model";
import Cart from "../4-models/product-models/shopping_cart-model";

const router = express.Router();

router.get('/cart_details', async (req: Request, res: Response, next: NextFunction) => {
    try { 

        const decodeUser: User = await cyber.getDecodeToken(req);
        const cart : Cart = await cardProductLogic.getOrCreateCart(decodeUser.userID);   
        
        res.json(cart);

    } catch (error) {
        next(error);
    }
});

router.get('/cart_products_by_cart_id/:cart_id([0-9]+)', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await cardProductLogic.getCartProducts(+req.params.cart_id);   
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/add_cart_product', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const product = new ProductCartModel(req.body);   
        const newProduct = await cardProductLogic.addCartProduct(product); 

        res.json(newProduct);
    } catch (error) {
        next(error);
    } 
});

router.put('/update_one_cart_product', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProduct = new ProductCartModel(req.body);
        const newProduct = await cardProductLogic.updateCartProduct(cartProduct);

        res.json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.delete('/remove_one_cart_product/:cart_product_id([0-9]+)', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProductID = +req.params.cart_product_id;
        await cardProductLogic.deleteCartProduct(cartProductID);
     
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
})

router.delete('/remove_cart_products', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decodeUser: User = await cyber.getDecodeToken(req);
        await cardProductLogic.deleteCartProducts(decodeUser.userID);
      
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
})

export default router;