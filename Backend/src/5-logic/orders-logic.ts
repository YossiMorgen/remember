import { OkPacket } from 'mysql';
import { ValidationErrorModel } from '../4-models/error-models';
import OrdersModel from "../4-models/product-models/orders-model";
import dal from '../2-utils/dal';

async function addOrder( order : OrdersModel): Promise<OrdersModel> {
    
    const err = order.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const isBusy = await dal.execute(`
        SELECT COUNT(*) AS amount 
        FROM orders
        WHERE deliveryDate = ?
        `, 
        [order.deliveryDate]
    )

    if(isBusy[0]['amount']) throw new ValidationErrorModel("We can't have any more orders this day we are too busy")
    
    const res = await dal.execute(` 
        SELECT SUM(products.price * cart_products.amount ) AS price
        FROM cart_products
        LEFT JOIN products
        ON cart_products.productID = products.productID
        WHERE cartID = ?`, 
        [order.cartID]
    )
    const price = +(res[0]['price']).toFixed(2);
    if(price !== order.price) {
        throw new ValidationErrorModel(`The price is ${price} please refresh the page`)
    }
    
    let info: OkPacket = await dal.execute(`UPDATE shopping_cart SET ordered = 1 WHERE cartID = ? AND userID = ? AND ordered = 0`, [order.cartID, order.userID])
    if(info.affectedRows === 0) throw new ValidationErrorModel(`cart does'nt exist or it's not yours`);

    const sql = 'INSERT INTO orders VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [ order.userID, order.cartID, order.price, order.city, order.address, order.deliveryDate, new Date(), order.creditCard]

    info = await dal.execute(sql, values);
    order.orderID = info.insertId;


    return order;
}

async function getOrdersAmount() {
    const amount = await dal.execute('SELECT COUNT(*) as amount FROM orders');
    return amount[0]['amount'];
}

function getBusyDates(){
    return dal.execute(`
        SELECT deliveryDate
        FROM orders
        GROUP BY deliveryDate
        HAVING COUNT(*) > 2`
    );    
}
export default {
    addOrder,
    getOrdersAmount,
    getBusyDates
}