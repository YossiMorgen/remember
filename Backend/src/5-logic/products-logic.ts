import { OkPacket } from 'mysql';
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from '../4-models/error-models';
import fileHandler from '../2-utils/file-handler';
import appConfig from '../2-utils/AppConfig';
import ProductModel from '../4-models/product-models/product-model';
import CategoryModel from '../4-models/product-models/category-model';

function getCategories():Promise<CategoryModel> {
    return dal.execute('SELECT * FROM categories');
}

function getRandomProducts (start: number, end: number): Promise<ProductModel[]> {
    const sql = `
    SELECT productID, productName, price,  CONCAT(?, imageName) AS imageName, categoryID, description, weight, weightType, unitsInStock
    FROM products
    ORDER BY products.productName
    LIMIT ?
    OFFSET ?
    `;
    return dal.execute(sql, [appConfig.nodeUrl, end, start])
}

async function getProductsByName(name : string, start: number, end: number): Promise<ProductModel[]> {
    const products = await dal.execute(`
        SELECT productID, productName, price,  CONCAT(?, imageName) AS imageName, categoryID, description, weight, weightType, unitsInStock
        FROM products
        WHERE productName LIKE ?
        ORDER BY products.productName
        LIMIT ?
        OFFSET ?
    `, [appConfig.nodeUrl, `%${name}%`, end, start ]);

    return products;
}

async function getProductsByCategory(categoryID: number,start: number, end: number): Promise<ProductModel[]> {
    const products = await dal.execute(
        `SELECT productID, productName, price,  CONCAT(?, imageName) AS imageName, categoryID, description, weight, weightType, unitsInStock
        FROM products
        WHERE products.categoryID = ?
        ORDER BY products.productName
        LIMIT ?
        OFFSET ?
    `, [appConfig.nodeUrl, categoryID, end, start]);

    return products;
}

async function addProduct(product:ProductModel): Promise<ProductModel> {
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);

    if(await isProductNameExist(product.productName)) throw new ValidationErrorModel(`Product ${product.productName} already exists`);
    
    product.imageName = await fileHandler.saveFile(product.image);
    delete product.image;

    const sql = "INSERT INTO products VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)";
    const info:OkPacket = await dal.execute(sql, [product.productName, product.categoryID, product.price, product.imageName, product.description, product.weight, product.weightType, product.unitsInStock]);
    
    product.productID = info.insertId;
    product.imageName = appConfig.nodeUrl + product.imageName;
    return product; 
}


async function updateProduct(product: ProductModel): Promise<ProductModel> {        
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err); 

    // need to change that and get the old photo from the old product
    const [oldProduct] = await dal.execute(`
        SELECT imageName, productName 
        FROM products 
        WHERE productID = ?`, 
        [product.productID]
    );

    if(
        oldProduct.productName !== product.productName && 
        await isProductNameExist(product.productName)
    ) {
        throw new ValidationErrorModel(`Product ${product.productName} already exists`);
    }
        
    
    let sql = "UPDATE products SET productName = ?, price = ?, categoryID = ?, description = ?, weight = ?, weightType = ?, unitsInStock = ?"
    const arr: Array<any> = [product.productName, product.price, product.categoryID, product.description, product.weight, product.weightType, product.unitsInStock]

    
    if(product.image){        

        fileHandler.deleteFile(oldProduct.imageName);
        
        product.imageName = await fileHandler.saveFile(product.image);
        delete product.image;

        sql += " , imageName =?";
        arr.push(product.imageName);

        product.imageName = appConfig.nodeUrl + product.imageName
    
    }
    
    sql += ` WHERE productID = ?`
    arr.push(product.productID);

    const info: OkPacket = await dal.execute(sql, arr);     
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(product.productID);

    return product;
}

async function isProductNameExist(productName: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) as productName FROM products WHERE productName = ?`;
    const [count] = await dal.execute(sql,[productName]);
    
    return (count['productName'] > 0);
}



async function deleteProduct(id:number): Promise<void> {

    const products = await dal.execute(`SELECT imageName FROM products WHERE productID = ?`, [id]);
    const oldProduct = products[0];    
    fileHandler.deleteFile(oldProduct.imageName);

    dal.execute("DELETE FROM products WHERE productID =?", [id]);

}

async function getProductsAmount(){
    const amount = await dal.execute('SELECT COUNT(*) as amount FROM products');    
    return amount[0]['amount'];
}


export default {
    getProductsByCategory,
    getRandomProducts,
    getProductsByName,
    addProduct,
    deleteProduct,
    getCategories,
    updateProduct,
    getProductsAmount
};








