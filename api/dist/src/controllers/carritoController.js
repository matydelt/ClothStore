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
const user_1 = __importDefault(require("../models/user"));
const carrito_1 = __importDefault(require("../models/carrito"));
const publication_1 = __importDefault(require("../models/publication"));
class CarritoController {
    static postCarrito(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carrito = req.body;
                const { _id } = req.params;
                const carritoBuscado = yield carrito_1.default.findOne({ userId: _id });
                if (carritoBuscado) {
                    let length = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.length;
                    if (length === 0) {
                        carrito.forEach((p) => __awaiter(this, void 0, void 0, function* () {
                            // const public = 
                            carritoBuscado.publications.push({
                                publication: p.id,
                                price: p.price,
                                quantity: p.quantity,
                                title: p.title,
                                image: p.image,
                                discount: p === null || p === void 0 ? void 0 : p.discount
                            });
                        }));
                    }
                    carrito.forEach((c) => {
                        var _a, _b, _c;
                        for (let i = 0; i < length; i++) {
                            if ((_b = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications[i]) === null || _a === void 0 ? void 0 : _a.publication) === null || _b === void 0 ? void 0 : _b.equals(c.id)) {
                                carritoBuscado.publications[i].quantity += parseInt(c.quantity);
                            }
                            else {
                                if (!carritoBuscado.publications.find(p => p.publication.equals(c.id)))
                                    (_c = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _c === void 0 ? void 0 : _c.push({
                                        publication: c.id,
                                        price: c.price,
                                        quantity: c.quantity,
                                        title: c.title,
                                        image: c.image,
                                        discount: c === null || c === void 0 ? void 0 : c.discount
                                    });
                            }
                        }
                    });
                    carritoBuscado.markModified('publications');
                    yield carritoBuscado.save();
                    res.sendStatus(200);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static getCarrito(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield user_1.default.findOne({ email });
                let carritoBuscado = yield carrito_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
                let change = false;
                if (carritoBuscado) {
                    for (let index = 0; index < ((_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.length); index++) {
                        const publicationStock = yield publication_1.default.findById(carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications[index].publication);
                        if (publicationStock) {
                            if ((carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications[index].quantity) > publicationStock.stock) {
                                change = true;
                                carritoBuscado.publications[index].quantity = publicationStock.stock;
                            }
                        }
                    }
                    if (change) {
                        carritoBuscado.markModified('publications');
                        yield carritoBuscado.save();
                    }
                }
                return res.json(carritoBuscado);
            }
            catch (error) {
                console.error(error);
                return res.sendStatus(500);
            }
        });
    }
    static putCarritoAmount(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let nuevo = false;
            try {
                const { id, email, amount } = req.params;
                const user = yield user_1.default.findOne({ "email": `${email}` });
                const findPublic = yield publication_1.default.findById(id).populate('discount');
                const carritoBuscado = yield carrito_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
                const publicationSearched = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.find((p) => {
                    if (p === null || p === void 0 ? void 0 : p.publication.equals(id)) {
                        if ((p === null || p === void 0 ? void 0 : p.quantity) + parseInt(amount) < (findPublic === null || findPublic === void 0 ? void 0 : findPublic.stock)) {
                            p.quantity = p.quantity + parseInt(amount);
                        }
                        else if ((p === null || p === void 0 ? void 0 : p.quantity) + parseInt(amount) >= (findPublic === null || findPublic === void 0 ? void 0 : findPublic.stock)) {
                            p.quantity = findPublic === null || findPublic === void 0 ? void 0 : findPublic.stock;
                        }
                        nuevo = false;
                        return p;
                    }
                    else {
                        nuevo = true;
                    }
                });
                if (!publicationSearched) {
                    if (findPublic) {
                        (_b = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _b === void 0 ? void 0 : _b.push({
                            publication: findPublic._id,
                            quantity: parseInt(amount),
                            title: findPublic === null || findPublic === void 0 ? void 0 : findPublic.name,
                            image: findPublic === null || findPublic === void 0 ? void 0 : findPublic.images[0].url,
                            price: findPublic.discount ? findPublic.price - findPublic.price * findPublic.discount.percentage / 100 : findPublic.price,
                            discount: (_c = findPublic === null || findPublic === void 0 ? void 0 : findPublic.discount) === null || _c === void 0 ? void 0 : _c.percentage
                        });
                    }
                }
                carritoBuscado.markModified('publications');
                yield carritoBuscado.save();
                res.status(200).json(carritoBuscado);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static putCarrito(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let nuevo = false;
            try {
                const { id, email } = req.params;
                const user = yield user_1.default.findOne({ "email": `${email}` });
                const carritoBuscado = yield carrito_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
                const findPublic = yield publication_1.default.findById(id).populate('discount');
                if (findPublic.stock < 1)
                    return res.json({ msg: 'No hay stock' });
                const publicationSearched = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.find((p) => {
                    if (p === null || p === void 0 ? void 0 : p.publication.equals(id)) {
                        if ((p === null || p === void 0 ? void 0 : p.quantity) < findPublic.stock) {
                            p.quantity++;
                        }
                        nuevo = false;
                        return p;
                    }
                    else {
                        nuevo = true;
                    }
                });
                if (!publicationSearched) {
                    if (findPublic) {
                        (_b = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _b === void 0 ? void 0 : _b.push({
                            publication: findPublic._id,
                            quantity: 1,
                            title: findPublic === null || findPublic === void 0 ? void 0 : findPublic.name,
                            image: findPublic === null || findPublic === void 0 ? void 0 : findPublic.images[0].url,
                            price: findPublic.discount ? findPublic.price - findPublic.price * findPublic.discount.percentage / 100 : findPublic.price,
                            discount: (_c = findPublic === null || findPublic === void 0 ? void 0 : findPublic.discount) === null || _c === void 0 ? void 0 : _c.percentage
                        });
                    }
                }
                carritoBuscado.markModified('publications');
                yield carritoBuscado.save();
                res.status(200).json(carritoBuscado);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static putCarritoRemove(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let nuevo = false;
            try {
                const { id, email } = req.params;
                const user = yield user_1.default.findOne({ email });
                const carritoBuscado = yield carrito_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
                const publicationSearched = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.find((p) => {
                    if (p === null || p === void 0 ? void 0 : p.publication.equals(id)) {
                        if (p.quantity < 2) {
                            carritoBuscado.publications = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications.filter((publicationDelete) => publicationDelete.publication !== p.publication);
                            return;
                        }
                        ;
                        p.quantity--;
                        nuevo = false;
                        return p;
                    }
                });
                carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.markModified('publications');
                yield carritoBuscado.save();
                res.status(200).json(carritoBuscado);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = CarritoController;
