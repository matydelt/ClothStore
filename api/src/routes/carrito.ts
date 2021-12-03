import { Router } from "express"
import CarritoController from "../controllers/carritoController"

const router:Router = Router()


router.post('/carrito/:_id', CarritoController.postCarrito);
router.get('/carrito/:email', CarritoController.getCarrito);

module.exports = router;


