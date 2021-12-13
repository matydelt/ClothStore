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
                const carritoBuscado = yield carrito_1.default.findOne({
                    userId: _id,
                });
                if (carritoBuscado) {
                    let length = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.length;
                    if (length === 0) {
                        carrito.forEach((p) => {
                            carritoBuscado.publications.push({
                                publication: p.id,
                                price: p.price,
                                quantity: p.amount,
                                title: p.title,
                                image: p.image,
                            });
                        });
                    }
                    carrito.forEach((c) => {
                        var _a, _b, _c;
                        for (let i = 0; i < length; i++) {
                            if ((_b = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications[i]) === null || _a === void 0 ? void 0 : _a.publication) === null || _b === void 0 ? void 0 : _b.equals(c.id)) {
                                carritoBuscado.publications[i].quantity += parseInt(c.amount);
                            }
                            else {
                                if (!carritoBuscado.publications.find((p) => p.publication.equals(c.id)))
                                    (_c = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _c === void 0 ? void 0 : _c.push({
                                        publication: c.id,
                                        price: c.price,
                                        quantity: c.amount,
                                        title: c.title,
                                        image: c.image,
                                    });
                                // break;
                            }
                        }
                    });
                    carritoBuscado.markModified("publications");
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield user_1.default.findOne({ email });
                const carritoBuscado = yield carrito_1.default.findOne({
                    userId: user === null || user === void 0 ? void 0 : user._id,
                });
                console.log(carritoBuscado);
                res.json(carritoBuscado);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static putCarritoAmount(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let nuevo = false;
            try {
                const { id, email, amount } = req.params;
                const user = yield user_1.default.findOne({ "email": `${email}` });
                const carritoBuscado = yield carrito_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
                const publicationSearched = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.find((p) => {
                    if (p === null || p === void 0 ? void 0 : p.publication.equals(id)) {
                        console.log('entró en if');
                        p.quantity = p.quantity + parseInt(amount);
                        nuevo = false;
                        return p;
                    }
                    else {
                        console.log('entró en else');
                        nuevo = true;
                    }
                });
                if (!publicationSearched) {
                    const findPublic = yield publication_1.default.findById(id);
                    if (findPublic) {
                        (_b = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _b === void 0 ? void 0 : _b.push({
                            publication: findPublic._id,
                            quantity: parseInt(amount),
                            title: findPublic === null || findPublic === void 0 ? void 0 : findPublic.name,
                            image: findPublic === null || findPublic === void 0 ? void 0 : findPublic.images[0].url,
                            price: findPublic.price
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let nuevo = false;
            try {
                const { id, email } = req.params;
                console.log("---------id ---------", id);
                console.log("---------email ---------", email);
                const user = yield user_1.default.findOne({ "email": `${email}` });
                console.log("------user-----", user);
                const carritoBuscado = yield carrito_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
                console.log("------carritoBuscado-----", carritoBuscado);
                const publicationSearched = (_a = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _a === void 0 ? void 0 : _a.find((p) => {
                    if (p === null || p === void 0 ? void 0 : p.publication.equals(id)) {
                        console.log('entró en if');
                        p.quantity++;
                        nuevo = false;
                        return p;
                    }
                    else {
                        console.log('entró en else');
                        nuevo = true;
                    }
                });
                console.log("------publicationSearched-----", publicationSearched);
                if (!publicationSearched) {
                    const findPublic = yield publication_1.default.findById(id);
                    console.log("------findPublic-----", findPublic);
                    if (findPublic) {
                        (_b = carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications) === null || _b === void 0 ? void 0 : _b.push({
                            publication: findPublic._id,
                            quantity: 1,
                            title: findPublic === null || findPublic === void 0 ? void 0 : findPublic.name,
                            image: findPublic === null || findPublic === void 0 ? void 0 : findPublic.images[0].url,
                            price: findPublic.price
                        });
                        console.log(carritoBuscado === null || carritoBuscado === void 0 ? void 0 : carritoBuscado.publications, '-----------------------------------------------------------asdsdsadsa');
                    }
                }
                carritoBuscado.markModified('publications');
                yield carritoBuscado.save();
                console.log(carritoBuscado.publications, 'publication******');
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
                            console.log(p, 'publicacion borrada');
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
                console.log('publication END');
                res.status(200).json(carritoBuscado);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = CarritoController;
