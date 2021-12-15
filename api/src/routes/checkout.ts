import { Router } from "express"
import Checkout from "../controllers/checkoutController"

const router:Router = Router()

router.post('/checkout', Checkout.postCheckout)
router.post('/statusmp', Checkout.postMP)

module.exports = router;
