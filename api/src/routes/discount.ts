import { Router } from "express"
import DiscountController from "../controllers/discountController"

const router:Router = Router()


router.post('/discount', DiscountController.postDiscount);


module.exports = router;


