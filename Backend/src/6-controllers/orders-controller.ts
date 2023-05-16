import express, {Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import User from "../4-models/auth-models/user-model";
import cyber from "../2-utils/cyber";
import OrdersModel from "../4-models/product-models/orders-model";
import ordersLogic from "../5-logic/orders-logic";

const router = express.Router();

router.post('/create_order', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = new OrdersModel(req.body);
        const decodeUser: User = await cyber.getDecodeToken(req);
        order.userID = decodeUser.userID;

        const newOrder = await ordersLogic.addOrder(order)

        res.json(newOrder);
    } catch (error) {
        next(error);
    }
})

router.get('/get_busy_dates', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dates = await ordersLogic.getBusyDates();
        res.json(dates);
    } catch (error) {
        next(error);
    }

})
export default router;