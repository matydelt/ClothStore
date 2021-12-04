import { Router } from "express"
import CarritoController from "../controllers/carritoController"

const router:Router = Router()


router.post('/carrito/:_id', CarritoController.postCarrito);
router.get('/carrito/:email', CarritoController.getCarrito);
router.put('/carrito/:email/:id', CarritoController.putCarrito);
router.put('/carrito/remove/:email/:id', CarritoController.putCarritoRemove);

module.exports = router;


