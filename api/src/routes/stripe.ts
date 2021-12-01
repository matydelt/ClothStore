import express, { Request, Response } from "express";
import Stripe from "stripe";
const stripe: Stripe = require("stripe")("sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y");
const router = express.Router();

// funcion de prueba
const calculateOrderAmount = (items: any) => {
  return 1400;
};

router.post("/create-payment-intent", async (req: Request, res: Response) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
