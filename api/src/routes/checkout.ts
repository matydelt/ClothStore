import { Router } from "express"
import Checkout from "../controllers/checkoutController"

const router:Router = Router()

router.post('/checkout', Checkout.postCheckout)

module.exports = router;
