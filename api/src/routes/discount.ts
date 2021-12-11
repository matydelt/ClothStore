import { Router } from "express"
import DiscountController from "../controllers/discountController"

const router:Router = Router()


router.post('/discount', DiscountController.postDiscount);
router.post('/discount/remove', DiscountController.removeDiscount);


module.exports = router;


