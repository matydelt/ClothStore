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
const axios_1 = __importDefault(require("axios"));
const sendEMail = require('../email/email');
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
                            category_id: order.userId,
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
                    back_urls: { failure: '', pending: '', success: "https://clothstore-wine.vercel.app/" },
                    notification_url: "https://cloth-store-henry.herokuapp.com/statusmp",
                };
                const response = yield mercadopago_1.default.preferences.create(preference);
                res.json(response.body.init_point);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static postMP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const MPInfo = req.body;
            try {
                const mpApi = (yield axios_1.default.get(`https://api.mercadopago.com/v1/payments/${MPInfo.data.id}?access_token=${process.env.MERCADOPAGO_API_PROD_ACCESS_TOKEN}`)).data;
                if (mpApi) {
                    const userCompra = yield user_1.default.findById(mpApi.additional_info.items[0].category_id);
                    if (userCompra) {
                        console.log(userCompra);
                        const userCarrito = yield carrito_1.default.findOne({ userId: mpApi.additional_info.items[0].category_id });
                        if (userCarrito) {
                            console.log(userCarrito);
                            const compra = new shopping_1.default({
                                publications: userCarrito.publications,
                                amount: mpApi.transaction_amount,
                                userId: mpApi.additional_info.items[0].id,
                                date: mpApi.date_created,
                                state: true,
                                status: mpApi.status,
                                status_detail: mpApi.status_detail,
                            });
                            yield compra.save();
                            userCompra.shopping.push(compra);
                            yield (userCompra === null || userCompra === void 0 ? void 0 : userCompra.save());
                            sendEMail.send({
                                purchaseTotal: mpApi.transaction_amount,
                                email: userCompra.email,
                                subject: "Compra realizada",
                                htmlFile: "purchaseSuccess.html",
                            });
                            const obj = {};
                            obj["users"] = [];
                            if (userCarrito.publications) {
                                for (let i = 0; i < userCarrito.publications.length; i++) {
                                    const publi = yield publication_1.default.findById(userCarrito.publications[i].publication);
                                    if (publi) {
                                        const us = yield user_1.default.findById(publi.author);
                                        if (us) {
                                            publi.stock -= userCarrito.publications[i].quantity;
                                            publi.markModified('stock');
                                            yield publi.save();
                                            for (let j = 0; j < us.publications.length; j++) {
                                                if (us.publications[j].order == publi.order) {
                                                    us.publications[j].stock -= userCarrito.publications[i].quantity;
                                                }
                                            }
                                            us.markModified('publications');
                                            yield us.save();
                                            if (!(Object.keys(obj).includes(us.email))) {
                                                obj[`${us.email}`] = [userCarrito.publications[i]];
                                                obj.users.push(us.email);
                                                continue;
                                            }
                                            obj[`${us.email}`].push(userCarrito === null || userCarrito === void 0 ? void 0 : userCarrito.publications[i]);
                                        }
                                    }
                                }
                                for (let i = 0; i < obj.users.length; i++) {
                                    const userVenta = yield user_1.default.findOne({ email: obj.users[i] });
                                    if (userVenta) {
                                        let compras = 0;
                                        let comprar = 0;
                                        comprar = obj[`${obj.users[i]}`].forEach((c) => {
                                            compras = compras + (c.price * c.quantity);
                                        });
                                        const venta = new sales_1.default({
                                            publications: obj[`${obj.users[i]}`],
                                            amount: compras,
                                            userId: userVenta._id,
                                            date: mpApi.date_created,
                                            state: true,
                                            status: mpApi.status,
                                            status_detail: mpApi.status_detail,
                                            codigo: `${mpApi.id}`
                                        });
                                        sendEMail.send({
                                            purchaseTotal: compras,
                                            email: userVenta.email,
                                            purchaseCode: mpApi.codigo,
                                            subject: "Han realizado una compra de tus productos",
                                            htmlFile: "purchaseReceived.html",
                                        });
                                        yield venta.save();
                                        userVenta.sales.push(venta);
                                        yield userVenta.save();
                                    }
                                }
                                userCarrito.publications = [];
                                userCarrito.markModified('publications');
                                yield userCarrito.save();
                            }
                            res.sendStatus(200);
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.sendStatus(404);
            }
        });
    }
}
exports.default = Checkout;
