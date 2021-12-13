"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publication_1 = __importDefault(require("../models/publication"));
const shopping_1 = __importDefault(require("../models/shopping"));
const user_1 = __importDefault(require("../models/user"));
const carrito_1 = __importDefault(require("../models/carrito"));
const mercadopago_1 = __importDefault(require("mercadopago"));
const dotenv_1 = __importDefault(require("dotenv"));
const sales_1 = __importDefault(require("../models/sales"));
dotenv_1.default.config();
const { MERCADOPAGO_API_PROD_ACCESS_TOKEN } = process.env;
mercadopago_1.default.configure({
    access_token: MERCADOPAGO_API_PROD_ACCESS_TOKEN
});
class Checkout {
    static postCheckout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body;
            try {
                const orderMap = [];
                for (let i = 0; i < order.publications.length; i++) {
                    const descript = yield publication_1.default.findById(order.publications[i].publication);
                    if (descript) {
                        orderMap.push({
                            id: order.publications[i].publication,
                            description: descript.detail,
                            title: order.publications[i].title,
                            unit_price: order.publications[i].price,
                            quantity: order.publications[i].quantity
                        });
                    }
                }
                const preference = {
                    items: orderMap,
                    marketplace: 'Cloth Store',
                    additional_info: order._id,
                    statement_descriptor: "Clothstore",
                    back_urls: { failure: '', pending: '', success: 'http://localhost:3000/' }
                };
                const response = yield mercadopago_1.default.preferences.create(preference);
                let compras = 0;
                let comprar = 0;
                comprar = order.publications.forEach((c) => {
                    compras = compras + (c.price * c.quantity);
                });
                const compra = new shopping_1.default({
                    publications: order.publications,
                    amount: compras,
                    userId: order.userId,
                    date: response.body.date_created,
                    state: true,
                    status: "pending",
                    status_detail: "pending accreditation",
                    link: `${response.body.init_point}`
                });
                yield compra.save();
                const userCompra = yield user_1.default.findById(order.userId);
                userCompra === null || userCompra === void 0 ? void 0 : userCompra.shopping.push(compra);
                yield (userCompra === null || userCompra === void 0 ? void 0 : userCompra.save());
                const obj = {};
                obj["users"] = [];
                for (let i = 0; i < order.publications.length; i++) {
                    const publi = yield publication_1.default.findById(order.publications[i].publication);
                    if (publi) {
                        const us = yield user_1.default.findById(publi.author);
                        if (us) {
                            publi.stock -= order.publications[i].quantity;
                            publi.markModified('stock');
                            yield publi.save();
                            for (let j = 0; j < us.publications.length; j++) {
                                if (us.publications[j].order == publi.order) {
                                    us.publications[j].stock -= order.publications[i].quantity;
                                }
                            }
                            us.markModified('publications');
                            yield us.save();
                            if (!(Object.keys(obj).includes(us.email))) {
                                obj[`${us.email}`] = [order.publications[i]];
                                obj.users.push(us.email);
                                continue;
                            }
                            obj[`${us.email}`].push(order.publications[i]);
                        }
                    }
                }
                for (let i = 0; i < obj.users.length; i++) {
                    const userVenta = yield user_1.default.findOne({ email: obj.users[i] });
                    if (userVenta) {
                        compras = 0;
                        comprar = 0;
                        comprar = obj[`${obj.users[i]}`].forEach((c) => {
                            compras = compras + (c.price * c.quantity);
                        });
                        const venta = new sales_1.default({
                            publications: obj[`${obj.users[i]}`],
                            amount: compras,
                            userId: userVenta._id,
                            date: response.body.date_created,
                            state: true,
                            status: "pending",
                            status_detail: "pending accreditation",
                            codigo: ``
                        });
                        yield venta.save();
                        userVenta.sales.push(venta);
                        yield userVenta.save();
                    }
                }
                const carrito = yield carrito_1.default.findById(order._id);
                if (carrito) {
                    carrito.publications = [];
                    carrito.markModified('publications');
                    yield carrito.save();
                }
                res.json(response.body.init_point);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Checkout;
