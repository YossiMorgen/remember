import { ResourceNotFoundErrorModel } from '../4-models/error-models';
import { OkPacket } from 'mysql';
import { ValidationErrorModel } from "../4-models/error-models";
import dal from '../2-utils/dal';
import ProductCartModel from '../4-models/product-models/product_cart-model';
import Cart from '../4-models/product-models/shopping_cart-model';
import appConfig from '../2-utils/AppConfig';

async function createCart(userID: number): Promise<object>{
    const date = new Date();
    const info: OkPacket = await dal.execute('INSERT INTO shopping_cart VALUES (DEFAULT, ?, ?, DEFAULT)', [userID, date]);
    return {userID, cartID: info.insertId, productionDate : date}
}

async function getOrCreateCart(userID: number): Promise<Cart> {
    const res = await dal.execute('SELECT * FROM `shopping_cart` WHERE `userID` =? AND shopping_cart.ordered = 0', [userID]);
    
    let cart = res[0];
    if(!cart){
        cart = await createCart(userID);
    }
    return cart;
    
}

function getCartProducts(cartID: number): Promise<ProductCartModel[]> {
    return dal.execute(`
        SELECT 
            cartProductID, 
            cart_products.productID, 
            amount, 
            price, 
            cartID, 
            products.productName, 
            CONCAT(?, products.imageName) as imageName, 
            products.weight
        FROM cart_products
        LEFT JOIN products
        ON cart_products.productID = products.productID
        WHERE cartID = ?
        ORDER BY products.productName
    `, [appConfig.nodeUrl, cartID]);
}

async function addCartProduct( product : ProductCartModel): Promise<ProductCartModel> {
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const sql = 'INSERT INTO cart_products VALUES (DEFAULT, ?, ?, ?)'
    const values = [product.productID, product.amount, product.cartID]
    
    const info: OkPacket = await dal.execute(sql, values);

    const productDetails = await getOneProductDetails(info.insertId);

    return productDetails;
}

async function updateCartProduct( product : ProductCartModel): Promise<ProductCartModel> {
     
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const sql = 'UPDATE cart_products SET amount =? WHERE cartProductID = ?'
    const values = [product.amount, product.cartProductID]

    const info: OkPacket = await dal.execute(sql, values);
    if(info.affectedRows === 0)  throw new ResourceNotFoundErrorModel(product.cartProductID);

    const productDetails = await getOneProductDetails(product.cartProductID);

    return productDetails;
}

function deleteCartProduct(cartProductID: number) {
    const sql = "DELETE FROM cart_products WHERE cartProductID =?";
    return dal.execute(sql, [cartProductID]); 
}

function deleteCartProducts(userID: number) {
    const sql = `
        DELETE FROM cart_products 
        WHERE cartID = (SELECT cartID FROM shopping_cart WHERE shopping_cart.userID = ? AND shopping_cart.ordered = 0)
    `;
    return dal.execute(sql, [userID]); 
}

async function getOneProductDetails(cartProductID: number): Promise<ProductCartModel>  {
    const [productDetails] = await dal.execute(`
    SELECT cartProductID, cart_products.productID, amount, price, cartID, products.productName, CONCAT(?, products.imageName) as imageName
    FROM cart_products
    LEFT JOIN products
    ON cart_products.productID = products.productID
    WHERE cart_products.cartProductID = ? 
    `, [ appConfig.nodeUrl, cartProductID ])

    return productDetails;
}

export default {
    createCart,
    getOrCreateCart,
    getCartProducts,
    addCartProduct,
    updateCartProduct,
    deleteCartProduct,
    deleteCartProducts,
    getOneProductDetails
}